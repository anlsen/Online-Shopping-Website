const Product = require("../models/product-model");

async function addCartItem(req,res,next){
    let product;

    try{
        product=await Product.getSingleProduct(req.body.productId);
    }catch(error){
        next(error);
    }

    
    const cart=res.locals.cart;

    
    cart.addItem(product);
    
    req.session.cart=cart;


    res.status(201).json({
        message:"Cart updated!",
        newTotalItems:res.locals.cart.totalQuantity
    })
}

function getCart(req,res){

    //localsdaki carta eriştiğimiz için cart yenilenmiyor database e bakıp
    
    res.render("customer/cart/cart");
}


function updateCartItem(req,res){
    const cart=res.locals.cart;
    
    //sessiondan direkt olarak aldığın cart üzerinde methodları kullanamıyorsuna ancak locals üzerinden kullanabiliyosun
    const newUpdatedItemTotalPrice=cart.updateItem(req.body.productId,+req.body.newQuantity);
    
    req.session.cart=cart;

    

    res.json({
        message:"Item updated successfully",
        newTotalQuantity:cart.totalQuantity,
        newTotalPrice:cart.totalPrice,
        newUpdatedItemTotalPrice:newUpdatedItemTotalPrice
    })
}

module.exports={
    addCartItem:addCartItem,
    getCart:getCart,
    updateCartItem:updateCartItem
}