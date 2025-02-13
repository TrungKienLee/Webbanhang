const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    
    if (Object.keys(req.body).length === 0 || !req.files['thumb'] || !req.files['images']) throw new Error('Missing inputs')
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    req.body.thumb = req.files['thumb'][0].path;
    req.body.images = req.files['images'].map((file) => file.path); // or filenames if you're saving the files to disk
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createProduct: newProduct ? newProduct : 'Cannot create new product'
    })
    
})

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product'
    })
})
// Filtering, sorting & pagination
// const getProducts = asyncHandler(async (req, res) => {
//     const queries = {...req.query}
//     // Tách các trường đặc biệt ra khỏi query
//     const excludeFields = ['limit', 'sort','page','fields']
//     excludeFields.forEach(el => delete queries[el])

//     //Format lại các operators cho đúng cú pháp mongoose
//     let queryString = JSON.stringify(queries)
//     queryString.replace(/\b(gte|gt|lt|lte)\b/g,macthedEl => `$${macthedEl}`)
//     const formatedQueries = JSON.parse(queryString)

//     //Filtering
//     if(queries?.title) formatedQueries.title = {$regex: queries.title, $options:'i'}
//     let queryCommand = Product.find(formatedQueries)
//     // sorting
//     if ( req.query.sort){
//             const sortBy = req.query.sort.split(',').join(' ')
//             queryCommand = queryCommand.sort(sortBy)
//         }
//     //Execute query
//     // Số lượng sản phẩm thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
//     queryCommand.exec(async (err, response)=>{
//         if(err) throw new Error(err.message)
//         const counts = await Product.find(formatedQueries).countDocuments()
    
//     return res.status(200).json({
//         success: response ? true : false,
//         products: response ? response : 'Cannot get products',
//         counts
//     })})
// })



// const getProducts = asyncHandler(async (req, res) => {
//     try {
//         const queries = { ...req.query };
        
//         // Tách các trường đặc biệt ra khỏi query
//         const excludeFields = ['limit', 'sort', 'page', 'fields'];
//         excludeFields.forEach(el => delete queries[el]);

//         // Format lại các operators cho đúng cú pháp mongoose
//         let queryString = JSON.stringify(queries);
//         queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`);
//         const formattedQueries = JSON.parse(queryString);

//         // Filtering
//         if (queries?.title) {
//             formattedQueries.title = { $regex: queries.title, $options: 'i' };
//         }
//         let queryCommand = Product.find(formattedQueries)
//         // Sorting
//         if ( req.query.sort){
//             const sortBy = req.query.sort.split(',').join(' ')
//             queryCommand = queryCommand.sort(sortBy)
//         }
//         // Execute query
//         const response = await Product.find(formattedQueries).exec();
//         const counts = await Product.find(formattedQueries).countDocuments();

//         return res.status(200).json({
//             success: true,
//             products: response,
//             counts
//         });
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: err.message
//         });
//     }
// });

// const getProducts = asyncHandler(async (req, res) => {
//     const products = await Product.find()
//     return res.status(200).json({
//         success: products ? true : false,
//         productDatas: products ? products : 'Cannot get products'
//     })
// })

const getProducts = asyncHandler(async (req, res) => {
    try {
        const queries = { ...req.query };
        
        // Tách các trường đặc biệt ra khỏi query
        const excludeFields = ['limit', 'sort', 'page', 'fields'];
        excludeFields.forEach(el => delete queries[el]);

        // Format lại các operators cho đúng cú pháp mongoose
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`);
        const formattedQueries = JSON.parse(queryString);

        // Filtering
        if (queries?.title) {
            formattedQueries.title = { $regex: queries.title, $options: 'i' };
        }

        // Execute query
        let queryCommand = Product.find(formattedQueries);

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queryCommand = queryCommand.sort(sortBy);
        }
        // Fields limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            queryCommand = queryCommand.select(fields)     
            
        }
        // Pagination
        // limit : số object lấy về 1 lần gọi api 
        // skip : 2 
        // 1 2 3 .... 10 
        const page = +req.query.page || 1 
        const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
        const skip = (page - 1) * limit
        queryCommand.skip(skip).limit(limit)



        // Execute query and count documents
        const response = await queryCommand.exec();
        const counts = await Product.find(formattedQueries).countDocuments();

        return res.status(200).json({
            success: true,
            products: response,
            counts
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product'
    })
})
const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
    })
})
const ratings = asyncHandler (async(req,res)=>{
    const {_id} = req.user
    const {star, comment, pid} = req.body
    if(!star || !pid) throw new Error ('Missing inputs')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString ===_id)
    // console.log({alreadyRating})
    if(alreadyRating){
        //update star and comment
        await Product.updateOne({
            ratings: { $elemMatch : alreadyRating}
        },{
            $set: { "ratings.$.star": star, "ratings.$.comment": comment }
        },{new: true})

    }else{
        //add star & comment
        await Product.findByIdAndUpdate(pid,{
            $push :{ratings:{star, comment, postedBy : _id}}
        },{new : true})

      
    }
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum+ +el.star,0)
    updatedProduct.totalRatings = Math.round(sumRatings*10/ratingCount)/10

    await updatedProduct.save()
    return res.status(200).json({
        status : true,
        updatedProduct
    })
})

// 2 tháng 7 , 2024
const uploadImagesProduct = asyncHandler(async(req, res)=>{
    const { pid} = req.params
    if(!req.files) throw new Error ('Missing inputs')
    const response = await Product.findByIdAndUpdate(pid, {$push:{images : { $each: req.files.map(el => el.path)} }} )
    return res.status(200).json({
        status : response ? true : false,
        updatedProduct : response ? response : 'Cannot upload images product'
    })
    
})


module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImagesProduct,
   

}