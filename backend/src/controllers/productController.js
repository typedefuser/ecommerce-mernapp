const Product = require('../models/Product');

const productController = {
  getProductsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const startIndex = (page - 1) * limit;

      const total = await Product.countDocuments({ category });

      const products = await Product.find({ category })
        .skip(startIndex)
        .limit(limit);

      res.json({
        totalProducts: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        products  
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  },
  getProductCategory: async(req,res)=>{
    try{
      const categorylist=await Product.distinct('category');
      res.json({categorylist})
    }
    catch(error){
      res.status(500).json({message:'error frtching categories',error:error.message})
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({ product });
    } catch (error) {
      res.status(500).json({ message: 'Error Fetching Product', error: error.message });
    }
  }
  
};

module.exports = productController;