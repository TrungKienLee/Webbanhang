// controller/flashSaleController.js
const moment = require("moment-timezone");
const FlashSale = require("../models/flashSale");
const User = require("../models/user");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const sendMail = require("../ultils/sendMail");


const createFlashSale = asyncHandler(async (req, res) => {
  const { name, startTime, endTime, products } = req.body;
  if (!name || !startTime || !endTime || !products)
    throw new Error("Missing inputs");
  for (const product of products) {
    const productData = await Product.findById(product.productId);
    if (!productData) {
      return res.json({
        success: false,
        message: `Product with ID ${product.productId} not found`,
      });
    }
    if (product.flashSaleQuantity > productData.quantity) {
      return res.json({
        success: false,
        message: `Flash sale quantity for product with ID ${product.productId} exceeds available quantity`,
      });
    }
  }
  const response = await FlashSale.create({
    ...req.body,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  });

  return res.json({
    success: response ? true : false,
    createdFlashSale: response ? response : "Cannot create new flash sale",
  });
});

const sendNotification = asyncHandler(async (req, res) => {
  const flashSale = await FlashSale.findOne().sort({ startTime: -1 });
  if (!flashSale) {
    return res.json({ success: false, message: "No flash sale found" });
  }

  const now = new Date();
  const startTime = new Date(flashSale.startTime);
  const notificationStartTime = new Date(startTime.getTime() - 60 * 60 * 1000);

  if (now >= notificationStartTime && now < startTime) {
    const users = await User.find({});
    const emailList = users.map((user) => user.email);

    const mailPromises = emailList.map((email) => {
      return sendMail({
        email: email,
        subject: "Upcoming Flash Sale!",
        html:`Flashsale chuẩn bị được bắt đầu. Hãy đăng nhập vào tài khoản của bạn và bắt đầu mua sắm nào <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>`
      });
    });

    try {
      await Promise.all(mailPromises);
      console.log("Emails sent successfully");
      return res.json({ success: true, message: "Emails sent successfully" });
    } catch (error) {
      console.log("Error sending emails:", error);
      console.log(res.json);
      return res.json({
        success: false,
        message: "Error sending emails",
        error,
      });
    }
  } else {
    return res.json({
      success: false,
      message: "Not within notification time range",
    });
  }
});

// Lấy tất cả flash sale
const getFlashSales = asyncHandler(async (req, res) => {
  const response = await FlashSale.find().select("-createdAt -updatedAt");
  return res.json({
    success: response ? true : false,
    flashSales: response ? response : "Cannot get flash sales",
  });
});

// Cập nhật flash sale
const updateFlashSale = asyncHandler(async (req, res) => {
  const { fid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await FlashSale.findByIdAndUpdate(fid, req.body, {
    new: true,
  });

  return res.json({
    success: response ? true : false,
    updatedFlashSale: response ? response : "Cannot update flash sale",
  });
});

// Xóa flash sale
const deleteFlashSale = asyncHandler(async (req, res) => {
  const { fid } = req.params;
  const response = await FlashSale.findByIdAndDelete(fid);

  return res.json({
    success: response ? true : false,
    deletedFlashSale: response ? response : "Cannot delete flash sale",
  });
});

module.exports = {
  createFlashSale,
  sendNotification,
  getFlashSales,
  updateFlashSale,
  deleteFlashSale,
};
