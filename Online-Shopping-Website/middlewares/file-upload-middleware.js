const multer=require("multer");
const uuid=require("uuid").v4;


const upload=multer({
    storage:multer.diskStorage({
        destination:"product-data/images",
        filename:function(req,file,cb){
            const fileName=uuid()+"-"+file.originalname;
            cb(null,fileName);
        }
        
    })
})


module.exports=upload.single("image");