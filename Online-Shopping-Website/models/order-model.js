const mongodb = require("mongodb");
const db=require("../data/database");


class Order{
    constructor(cartData,userData,status="pending",date,orderId){
        this.cartData=cartData;
        this.userData=userData;
        this.status=status;
        this.date=new Date(date);

        if(this.date){
            this.formattedDate=this.date.toLocaleDateString("en-US",{
                weekday:"long",
                day:"numeric",
                month:"long",
                year:"numeric"
            })
        }

        this.id=orderId;
    }

    save(){
        const orderData={
            cartData:this.cartData,
            userData:this.userData,
            date: new Date(),
            status:this.status
        }
        
        return db.getDatabase().collection("orders").insertOne(orderData);
    }


    static getAllOrders(userId){
        return db.getDatabase().collection("orders").find({"userData._id":new mongodb.ObjectId(userId)}).sort({_id:-1}).toArray();
    }

    static getAllOrdersAdmin(){
        return db.getDatabase().collection("orders").find().sort({_id:-1}).toArray();

    }

    static updateOrder(orderId,newStatus){
        return db.getDatabase().collection("orders").updateOne({_id:new mongodb.ObjectId(orderId)},{$set: {status:newStatus}});
    }
}



module.exports=Order;