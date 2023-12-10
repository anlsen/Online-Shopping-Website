const Order=require("../models/order-model");
const User=require("../models/user-model")

const stripe = require('stripe')('sk_test_51NoSv6Abc0eqLDbROOiopaqPhlPiptCzscKmxeQKOLinqp5Cogl1lSo67mVTMT8ueyuRHO790BctZCXPrpF0HG8y008slYXmos');


async function addOrder(req,res,next){
    const cartData=req.session.cart;

    let userData;
    try{   
        userData= await User.getUserById(req.session.uid);
    }catch(error){
        console.log(1);
        next(error);
        return;
    }
    const newOrder=new Order(cartData,userData);
    
    try{
        await newOrder.save();
    }catch(error){
        console.log(2);
        next(error);
        return;
    }
    req.session.cart=null;



    const formattedArray=cartData.items.map(function(item){
        return {
            price_data:{
                currency:"usd",
                product_data:{
                    name:item.product.title
                },
                unit_amount:+item.product.price.toFixed(2)*100,
            },
            quantity:item.quantity
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items: formattedArray,
        mode: 'payment',
        success_url: `http://localhost:3000/orders/success`,
        cancel_url: `http://localhost:3000/orders/failure`,
    });
    
    res.redirect(303, session.url);



}

async function getOrders(req,res,next){
    let orders;

    try{
        orders=await Order.getAllOrders(req.session.uid);
        
        orders=orders.map(function(order){
            return new Order(order.cartData,order.userData,order.status,order.date,order._id.toString());
        })
    }catch(error){
        next(error);
        return;
    }
    
    res.render("customer/orders/all-orders",{orders:orders});
}

function getSuccess(req,res){
    res.render("customer/orders/order-success");
}

function getFailure(req,res){
    res.render("customer/orders/order-fail");
}

module.exports={
    addOrder:addOrder,
    getOrders:getOrders,
    getSuccess:getSuccess,
    getFailure:getFailure
}