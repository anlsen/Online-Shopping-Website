const db=require("../data/database")
const mongodb=require("mongodb");

class Product{
    constructor(productData){
        this.title=productData.title;
        this.summary=productData.summary;
        this.price=productData.price;
        this.description=productData.description;
        this.image=productData.image;
        this.imagePath=`product-data/images/${this.image}`;
        this.imageUrl=`/products/assets/images/${this.image}`
        if(productData._id){
            this.id=productData._id
        }
    }

    async save(){
        await db.getDatabase().collection("products").insertOne({
            title:this.title,
            summary:this.summary,
            price:+this.price,
            description:this.description,
            image:this.image
        })
    }

    static async getAllProducts(){
        const products=await db.getDatabase().collection("products").find().toArray();
        
        return products.map(function(product){
            return new Product(product);
        });
        
    }

    static async getSingleProduct(postId){
        let product;
        try{
            product= await db.getDatabase().collection("products").findOne({_id:new mongodb.ObjectId(postId)});
        }catch(error){
            error.code=404;
            throw error;
        }

        if(!product){
            const error=new Error("No such user id exists");
            error.code=404;
            throw error;
        }
        return new Product(product);
    }

    static async updateSingleProduct(updatedProduct,postId){
        
        try{
            await db.getDatabase().collection("products").updateOne({_id:new mongodb.ObjectId(postId)},{
                $set:updatedProduct
            });
        }catch(error){
            error.code=404;
            throw error;
        }
    }

    async remove(){
        try{
            await db.getDatabase().collection("products").deleteOne({_id:new mongodb.ObjectId(this.id)});

        }catch(error){
            throw error;
        }
    }


    static async  isProductIdValid(productId){
        const product=await db.getDatabase().collection("products").findOne({_id:new mongodb.ObjectId(productId)});
        if(product){
            return true;
        }
        return false;
    }

    static async getDatabasePrice(productId){
        const product=await db.getDatabase().collection("products").findOne({_id:new mongodb.ObjectId(productId)});

        return product.price
    }
}


module.exports=Product;