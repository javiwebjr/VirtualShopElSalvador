import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Handler from "../middlewares/Handler.js";

function calcPrices (orderItems) {
    const itemsPrice = orderItems.reduce( (i, item) => i + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 5;
    const taxRate = 0.13;
    const taxPrice = (itemsPrice * taxRate).toFixed(2);
    const totalPrice = (itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(2);
    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice
    }
}

const createOrder = async (req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body;
        if(orderItems && orderItems.length === 0){
            res.status(400);
            throw new Error('No Items In Your Order')
        }
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) },
          });
        const dbOrderItems = orderItems.map(itemClient => {
            const matchingItemFromDB = itemsFromDB.find(
                itemDB => itemDB._id.toString() === itemClient._id
            )
            if(!matchingItemFromDB){
                res.status(404);
                throw new Error(`Product not found: ${itemClient._id}`);
            };
            return { ...itemClient, 
                product: itemClient._id, 
                price: matchingItemFromDB.price, 
                _id: undefined
            }
        });
        const {itemsPrice, taxPrice, shippingPrice, totalPrice} = calcPrices(dbOrderItems);
        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id username');
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user._id});
        res.json(orders);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const totalOrders = async (req, res) => {
    //Remember insted of "totalOrders" const, its countOrders
    try {
        const countOrders = await Order.countDocuments();
        res.json({countOrders});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const totalSales = async (req, res) => {
    try {
        const orders = await Order.find();
        const countSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);

        res.json({countSales});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}
const totalSalesByDate = async (req, res) => {
    try {
        const salesByDate = await Order.aggregate([
            {
                $match: {
                    isPaid: true,
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {format: '%Y-%m-%d', date: '$paidAt'}
                    },
                    countSales: {$sum: "$totalPrice"}
                }
            }
        ]);
        res.json(salesByDate);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const findOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'username email');
        if(order){
            res.json(order);
        }else{
            res.status(404);
            throw new Error('Order Not Found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const markOrderAsPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
            const updateOrder = await order.save();
            res.status(200).json(updateOrder);
        }else{
            res.status(404);
            throw new Error('Order Not Found - Paid');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const markOrderAsDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }else{
            res.status(404);
            throw new Error('Order Not Found - Delivered')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

export {createOrder, 
    getAllOrders, 
    getUserOrders, 
    totalOrders,
    totalSales,
    totalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered
};