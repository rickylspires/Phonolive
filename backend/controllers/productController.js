const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')


// Get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(Product.find(), req.query )
        .search()

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
})

// Get single product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

//ADD NEW product => /api/v1/admin/product/new
//This does not handle the images
exports.newProduct = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

// UPDATE product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

// DELETE product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    // TODO - ADD remove images
    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})