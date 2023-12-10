
const  bcrypt=require("bcryptjs");

const db=require("../data/database");
const mongodb=require("mongodb");

class User{
    constructor(email,password,fullname,street,postalCode,city){
        this.email=email;
        this.password=password;
        this.fullname=fullname;
        this.address={
            street:street,
            postalCode:postalCode,
            city:city
        };
    }

    async signup() {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 12);
    
            await db.getDatabase().collection("users").insertOne({
                email: this.email,
                password: hashedPassword,
                address: this.address
            });
        } catch (error) {
            throw new Error("Signup failed: " + error.message); // Throw a new error with a meaningful message
        }
    }

    static getUserById(userId){
        return db.getDatabase().collection("users").findOne({_id:new mongodb.ObjectId(userId) },{projection:{
            password:0
        }});
    }

    getUserWithSameEmail(){
        return db.getDatabase().collection("users").findOne({email:this.email});

    }
    
    doesPasswordMatch(hashedPassword){
        return bcrypt.compare(this.password,hashedPassword);
    }

}

module.exports=User;