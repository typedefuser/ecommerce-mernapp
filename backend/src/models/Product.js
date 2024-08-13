const mongoose =require('mongoose')


const productSchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  product_name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity_available: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  shipping_cost: { type: Number, required: true },
  arrival_date: { type: Date, required: true }
});

module.exports=mongoose.model('product', productSchema);