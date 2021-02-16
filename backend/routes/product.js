const express = require('express')
const router = express.Router();

const { 
    getProducts, 
    newProduct,
    getSingleProduct,
    updateProduct, 
    deleteProduct
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

//Public
router.route('/products').get(isAuthenticatedUser, authorizeRoles('admin'), getProducts);
router.route('/product/:id').get(getSingleProduct);

//Admin
router.route('/admin/products/new').post(isAuthenticatedUser, newProduct);
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, updateProduct)
    .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;