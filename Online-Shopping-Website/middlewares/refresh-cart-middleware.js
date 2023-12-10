
const Product=require("../models/product-model")


async function refreshCart(req, res, next) {
    const cart = res.locals.cart;

    

    

    for (let i = cart.items.length - 1; i >= 0; i--) {
        const cartItem = cart.items[i];
        

        if (await Product.isProductIdValid(cartItem.product.id)) {

            // Fiyat değişmiş mi diye bakacaksınız
            if(await Product.getDatabasePrice(cartItem.product.id)!==cartItem.product.price){
                
                
                const oldTotal=cartItem.product.price*cartItem.quantity;
                
                
                cartItem.product.price=await Product.getDatabasePrice(cartItem.product.id.toString());
                
                

                cartItem.totalPrice=cartItem.product.price*cartItem.quantity;
                cart.totalPrice+=cartItem.totalPrice - oldTotal;
            }
            
        } else {
            
            // Productu komple sileceksiniz
            cart.totalQuantity-=cartItem.quantity;
            cart.totalPrice-=cartItem.totalPrice;
            cart.items.splice(i, 1); // Remove the cartItem at index i
        }
    }
    res.locals.cart=cart;
    req.session.cart=cart;
    // Continue with your logic
    next();
}

module.exports=refreshCart;