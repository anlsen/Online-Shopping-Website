const Product=require("../models/product-model");
const Order=require("../models/order-model")

async function getProducts(req,res,next){
    try{
        const products= await Product.getAllProducts()
        
        res.render("./admin/products/all-products",{products:products})
    }catch(error){
        next(error);
        return;
    }

}
function postProduct(req,res,next){
    
    const product=new Product({
        ...req.body,
        image:req.file.filename
    })

    product.save().then(function(){
        res.redirect("/admin/products")
    }).catch(function(error){
        next(error);
    })

  
}

function getNewProduct(req,res){
    res.render("./admin/products/new-product")


}

async function getUpdateProduct(req,res,next){
    let product;
    try{
        product= await Product.getSingleProduct(req.params.id);
        
    }catch(error){
        next(error);
        return;
    }
    res.render("./admin/products/update-product",{product:product});
}

async function postUpdateProduct(req,res,next){
    const updateData={
        ...req.body
    };
    if(req.file){
        updateData.image=req.file.filename;
    }
    
    try{
        await Product.updateSingleProduct(updateData,req.params.id)
        res.redirect("/admin/products");
    }catch(error){
        next(error);
        return;
    }
}

async function deleteProduct(req,res,next){
    let product;

    try{
        product= await Product.getSingleProduct(req.params.id);
        
        await product.remove();
    }catch(error){
        next(error);
        return;
    }

    res.json({
        message:"Product deleted succesfully"
    });

}


async function getManageOrders(req,res){
    let orders;

    try{
        orders=await Order.getAllOrdersAdmin();
        
        orders=orders.map(function(order){
            return new Order(order.cartData,order.userData,order.status,order.date,order._id.toString());
        })
    }catch(error){
        next(error);
        return;
    }
    
    res.render("admin/orders/all-orders",{orders:orders});
}


async function updateOrder(req,res){
    await Order.updateOrder(req.body.orderId,req.body.status);
    res.json({
        message:"Successfull"
    });
}

module.exports={
    getProducts:getProducts,
    getNewProduct:getNewProduct,
    postProduct:postProduct,
    getUpdateProduct:getUpdateProduct,
    postUpdateProduct:postUpdateProduct,
    deleteProduct:deleteProduct,
    getManageOrders:getManageOrders,
    updateOrder:updateOrder
}