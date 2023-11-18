import Handler from "../middlewares/Handler.js";
import Product from '../models/productModel.js';

const addProduct = Handler(async (req, res) => {
    try {
        const {name, description, price, category, quantity, brand} = req.fields;
        const requiredFields = ['name', 'description', 'price', 'category', 'quantity', 'brand'];
        const isMissingField = requiredFields.find(field => !req.fields[field]);
        if(isMissingField){
            return res.json({
                error: `${isMissingField.charAt(0).toUpperCase() + isMissingField.slice(1)} Is Required`
            });
        }
        // switch (true) {
        //     case !name:
        //         return res.json({error: "Name Is Required"})
        //     case !description:
        //         return res.json({error: "Description Is Required"})
        //     case !price:
        //         return res.json({error: "Price Is Required"})
        //     case !category:
        //         return res.json({error: "Category Is Required"})
        //     case !quantity:
        //         return res.json({error: "Quantity Is Required"})
        //     case !brand:
        //         return res.json({error: "Brand Is Required"})
        // }
        const product = new Product({...req.fields});
        await product.save();
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(404).json(error.message);
    }
});

const updateProduct = Handler(async (req, res) => {
    try {
        const {name, description, price, category, quantity, brand} = req.fields;
        const requiredFields = ['name', 'description', 'price', 'category', 'quantity', 'brand'];
        const isMissingField = requiredFields.find(field => !req.fields[field]);
        if(isMissingField){
            return res.json({
                error: `${isMissingField.charAt(0).toUpperCase() + isMissingField.slice(1)} Is Required`
            });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true});
        await product.save();
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
});

const deleteProduct = Handler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

const fetchProducts = Handler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                 $options: "i"
                }
        } : {};
        const count = await Product.countDocuments({...keyword});
        const product = await Product.find({...keyword}).limit(pageSize);
        res.json({
            product, 
            page: 1, 
            pages: Math.ceil(count / pageSize),
            hasMore: false
        })
    } catch (error) {
        console.log(object);
        res.status(500).json({error: "Internal Server Error"})
    }
});

const fetchProductId = Handler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            return res.json(product);
        }else{
            res.status(404);
            throw new Error("Product Not Found");
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({error: "Product Not Found"})
    }
});

export {addProduct, updateProduct, deleteProduct, fetchProducts, fetchProductId};