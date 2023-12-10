const Product=require("../models/product-model");


async function getAllProducts(req,res,next){
    let products;
    try{
       products=await Product.getAllProducts();
    }catch(error){
        next(error);
        return;
    }
    res.render("./customer/products/all-products",{products:products});
}

async function getSingleProduct(req,res,next){
    let product;
    try{
        product=await Product.getSingleProduct(req.params.id)
    }catch(error){
        next(error);
    }
    res.render("./customer/products/product-detail",{product:product});
}

module.exports={
    getAllProducts:getAllProducts,
    getSingleProduct:getSingleProduct
}