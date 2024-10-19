const express = require('express');
const { create, deleteproduct, featureProduct, getFeaturedProducts, getProducts, getProductsByCategory, unfeatureProduct, updateProduct } = require('../../Controlers/Inventary/products.controller');
const { verifyToken } = require('../../utils/verifyUser');

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getproducts', getProducts);
router.put('/updateproduct/:productId/:userId', verifyToken, updateProduct);
router.delete('/deleteproduct/:productId/:userId', verifyToken, deleteproduct);
router.put('/featureproduct/:productId/:userId', verifyToken, featureProduct); 
router.put('/unfeatureproduct/:productId/:userId', verifyToken, unfeatureProduct); 
router.get('/featured', getFeaturedProducts);
router.get('/category', getProductsByCategory);

module.exports = router;
