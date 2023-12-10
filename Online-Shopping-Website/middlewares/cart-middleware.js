const Cart = require("../models/cart-model");

function initializeCart(req,res,next){
    let cart;
    if(req.session.cart){
        
        cart= new Cart(req.session.cart.items,req.session.cart.totalQuantity,req.session.cart.totalPrice);//because we cannot directly use methods on the cart if we try to reach out through session
    }else{
        cart=new Cart();
    }
    
    res.locals.cart=cart;
    next();
}


module.exports=initializeCart;