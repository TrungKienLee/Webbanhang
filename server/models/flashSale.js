// model/flashSale.js
const mongoose = require('mongoose');

const flashSaleSchema = new mongoose.Schema({
  name:{
    type: String,
    unique:true,
    required: true 
  },

  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'ended'],
    default: 'upcoming'
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    flashSaleQuantity: {
      type: Number,
      required: true
    },
    discount:{
        type:Number,
        required:true,
    },
  }]
});

const FlashSale = mongoose.model('FlashSale', flashSaleSchema);

module.exports = FlashSale;
