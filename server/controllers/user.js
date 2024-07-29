const User = require ('../models/user');
const Product = require ('../models/product');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto')
const makeToken = require('uniqid');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body
    if (!email || !password || !lastname || !firstname || !mobile) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    }
    const user = await User.findOne({ email })
    if (user) {
        throw new Error('User has existed!')
    }
    else {
        const token = await makeToken()
        res.cookie('dataregister', { ...req.body, token }, {
            httpOnly: true, maxAge: 15 * 60 * 1000
        })
        const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng kí của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giới <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>`
        await sendMail({ email, html, subject: 'Hoàn tất đăng ký ' })
        return res.json({
            success: true,
            mes: 'Please check your email to active account'
        })
    }

})

// const finalRegister = asyncHandler(async(req, res)=>{
//     const cookie = req.cookies
//     return res.json({
//         success : true,
//         cookie
//     })
// })

const finalRegister = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    const { token } = req.params
    if (Object.keys(cookie).length === 0 || cookie.dataregister.token !== token) {
        res.clearCookie('dataregister')
        return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)}
    const newUser = await User.create({
        email: cookie?.dataregister?.email,
        password: cookie?.dataregister?.password,
        firstname: cookie?.dataregister?.firstname,
        lastname: cookie?.dataregister?.lastname,
        mobile: cookie?.dataregister?.mobile,

    })
    res.clearCookie('dataregister')
    if (newUser) {
        return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
    }
    else {
        return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    // plain object
    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        // Tách password và role ra khỏi response
        const { password, role, refreshToken, ...userData } = response.toObject()
        // Tạo access token
        const accessToken = generateAccessToken(response._id, role)
        // Tạo refresh token
        const newRefreshToken = generateRefreshToken(response._id)
        // Lưu refresh token vào database
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        // Lưu refresh token vào cookie
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    } else {
        throw new Error('Invalid credentials!')
    }
})  
const getCurrent = asyncHandler(async(req, res)=> {
    const { _id} =req.user
    
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true:  false,
        rs : user? user : 'User not found'
    })

})
const refreshAccessToken = asyncHandler(async (req, res) => {
    // Lấy token từ cookies
    const cookie = req.cookies
    // Check xem có token hay không
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Xóa refresh token ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
})
// CLient gửi email 
// Server check email có hợp lệ hay không => gửi mail + kèm theo link (password change token)
// Client check mail => click vào link 
// Client gửi api kèm token 
// Server check xem có giống với token đã gửi mail không
// Nếu giống thì cho changepassword

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email!");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
    <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;
  const data = {
    email,
    html,
    subject: 'Forgot Password',
  };

  const rs = await sendMail(data);
  return res.status(200).json({
    success: rs.response?.includes('OK') ? true : false,
    mes: rs.response?.includes('OK') ? 'Hãy kiểm tra gmail của bạn!' : 'Mail này không tồn tại!',
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;

  if (!password || !token) throw new Error("Missing inputs");
  //digest tạo thành mã băm
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  // gt là so sánh lớn hơn
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Updated password" : "Something went wrong",
  });
});



const getUsers = asyncHandler(async(req,res)=>{
    const response = await User.find().select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true: false,
        users : response
    })
})

const deleteUser = asyncHandler(async(req,res) =>{
    const {_id} = req.query
    if(!_id ) throw new Error ('Missing inputs')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response? true: false,
        deletedUser : response ? `User with email ${response.email} deleted ` : 'No user delete'
        
    })
})
const updateUser = asyncHandler(async (req, res) => {
    // 
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})
const updateUserByAdmin = asyncHandler(async (req, res) => {
    // 
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})

const updateUserAddress = asyncHandler(async (req, res) => {
    // 
    const { _id } = req.user
    if (!req.body.address) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, {$push: {address: req.body.address}} , { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})

const updateCart = asyncHandler(async (req, res) => {
     const { _id } = req.user;
     const { pid, quantity, color } = req.body;
    console.log(pid, quantity, color);
     // Kiểm tra dữ liệu đầu vào
     if (!pid || !quantity || !color) {
       return res.status(400).json({
         success: false,
         message: "Missing inputs",
       });
     }

     try {
       // Tìm sản phẩm theo pid và lấy thông tin màu sắc
       const product = await Product.findById(pid).select("color.name").select("color.quantity");
       console.log(product);
       if (!product) {
         return res.status(400).json({
           success: false,
           message: "Product not found",
         });
       }

       // Tìm kiếm màu sắc trong mảng colors
       const colorInfo = product.color.find(
         (c) => c.name === color
       );
       console.log(colorInfo);
       if (!colorInfo) {
         return res.status(400).json({
           success: false,
           message: "Color not available for this product",
         });
       }

       // Kiểm tra xem số lượng yêu cầu có nhỏ hơn hoặc bằng số lượng có trong kho không
       if (quantity > colorInfo.quantity) {
         return res.status(400).json({
           success: false,
           message: "Requested quantity exceeds available stock",
         });
       }

       // Tìm người dùng và kiểm tra giỏ hàng
       const user = await User.findById(_id).select("cart");
       const alreadyProductIndex = user?.cart?.findIndex(
         (el) => el.product.toString() === pid && el.color === color
       );

       if (alreadyProductIndex !== -1) {
         // Khi sản phẩm đã có trong giỏ hàng và trùng màu
         const existingProduct = user.cart[alreadyProductIndex];
         // Cập nhật số lượng sản phẩm trong giỏ hàng
         const updateResponse = await User.findByIdAndUpdate(
           _id,
           { $set: { "cart.$[elem].quantity": quantity } },
           {
             arrayFilters: [{ "elem.product": pid, "elem.color": color }],
             new: true,
           }
         );
         return res.status(200).json({
           success: !!updateResponse,
           updatedUser: updateResponse || "Something went wrong",
         });
       } else {
         // Khi sản phẩm chưa có trong giỏ hàng hoặc màu khác
         const updatedUser = await User.findByIdAndUpdate(
           _id,
           { $push: { cart: { product: pid, quantity, color } } },
           { new: true }
         );

         return res.status(200).json({
           success: !!updatedUser,
           updatedUser: updatedUser || "Something went wrong",
         });
       }
     } catch (error) {
       return res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
       });
     }

});

const deleteCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, color } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!pid || !color) {
    return res.status(400).json({
      success: false,
      message: "Missing product ID or color",
    });
  }

  try {
    // Tìm và cập nhật người dùng bằng cách xóa sản phẩm khỏi giỏ hàng
    const updateResponse = await User.updateOne(
      { _id, "cart.product": pid, "cart.color": color },
      { $pull: { cart: { product: pid, color } } }
    );

    if (updateResponse.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product with the specified color not found in cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

const deleteAllCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const userCart = await User.findById(_id);
  userCart.cart = [];
  await userCart.save();
  return res.status(200).json({
    success: userCart ? true : false,
    deleteCart: userCart ? userCart : "Lỗi xóa sản phẩm",
  });
});


module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCart,
  resetPassword,
  finalRegister,
  deleteCart,
  deleteAllCart,
};