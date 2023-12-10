const express=require("express");
const adminController=require("../controllers/admin-controller");
const fileUploadMiddleware=require("../middlewares/file-upload-middleware");

const router=express.Router();


router.get("/products",adminController.getProducts);

router.get("/products/new",adminController.getNewProduct);

router.post("/products",fileUploadMiddleware,adminController.postProduct);

router.get("/products/:id",adminController.getUpdateProduct);

router.post("/products/:id",fileUploadMiddleware,adminController.postUpdateProduct)

router.delete("/products/:id",adminController.deleteProduct);

router.get("/orders",adminController.getManageOrders);

router.patch("/update",adminController.updateOrder)

module.exports=router;