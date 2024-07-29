const mongoose = require('mongoose')

var productCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true,
        index: true
        
    },
    isActive:{
        type: Boolean, 
        default : true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('ProductCategory', productCategorySchema)