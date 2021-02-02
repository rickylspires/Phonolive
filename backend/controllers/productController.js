const Product = require('../models/product')

// Get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}

// Get single product => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}

//ADD NEW product => /api/v1/admin/product/new
//This does not handle the images
exports.newProduct = async(req, res, next) => {

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
}

// UPDATE product => /api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
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
}

// DELETE product => /api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    // TODO - ADD remove images
    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
}