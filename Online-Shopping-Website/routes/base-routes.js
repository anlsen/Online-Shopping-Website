const express=require("express");
const baseController=require("../controllers/base-controller");


const router=express.Router();


router.get("/",baseController.getHome);


router.get("/401",baseController.error401);


router.get("/403",baseController.error403);


module.exports=router;