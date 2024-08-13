const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../auth/middleware/authMiddleware');

router.get('/getCategories',productController.getProductCategory);
router.get('/id/:id',productController.getProductById);
router.get('/category/:category', productController.getProductsByCategory);



module.exports = router;