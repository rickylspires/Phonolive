const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name can not exceed 100 characters']
    },
    // artist: {
    //     type: String,
    //     required: [true, 'Please enter product name'],
    //     trim: true,
    //     maxLength: [100, 'Product name can not exceed 100 characters']
    // },
    // label: {
    //     type: String,
    //     required: [true, 'Please enter product name'],
    //     trim: true,
    //     maxLength: [100, 'Product name can not exceed 100 characters']
    // },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        trim: true,
        maxLength: [5, 'Product price can not exceed 5 characters'],
        default: 0.0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: { 
        type: String,
        required: [true, 'Please enter a category for this product'],
        enum: {
            values: [
                'Music',
                'Merchandise',
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct category for product'
        }
    },
    // released: {
    //     type: Date
    // },
    // format: { 
    //     type: String,
    //     required: [true, 'Please enter a format for this product'],
    //     enum: {
    //         values: [
    //             'MP3',
    //             'Vinyl'
    //         ],
    //         message: 'Please select correct category for product'
    //     },
    //     default: 'MP3'
    // },
    // catalog_number: { 
    //     type: String,
    //     default: 0
    // },
    // genre: { 
    //     type: String,
    //     required: [true, 'Please enter a music genre for this product'],
    //     enum: {
    //         values: [
    //             'House',
    //             'Garage',
    //             'Techno',
    //             'Drum & Bass'
    //         ],
    //         message: 'Please select correct genre for product'
    //     }
    // },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);