const express=require('express');
const router=express.Router();
const multer= require("multer");

router.post("/image-upload",async(req,res)=>{
    try{
        const storage= multer.diskStorage({
            destination:function(req,file,callback){
                callback(null,'public/media')
            },
           filename:function(req,file,callback){
            callback(null,file.originalname)
        },
        });
        const maxSize=6*1024*1024;//for 6MB
        const upload=multer({
            storage:storage,
            fileFilter: (req, file, cb)=> {
              if(file.mimetype==="image/jpg"||
                file.mimetype==="image/png"||
                file.mimetype==="image/jpeg"||
                file.mimetype==="image/webp"      
              ){
                cb(null, true)
              }else{
                cb(null, false);
                return cb(new Error("Only jpg, png, jpeg and webp format is allowed"))
              }
            },
            limits: { fileSize: maxSize }
          }).array('photos',12)

//req.body= name, father name, age  req.file=image req.files= images
          upload(req,res, (error)=> {  
            console.log("body test", req.body);
            console.log("files test", req.files);

            if (error instanceof multer.MulterError) {        
                res.status(400).json({
                  status:"Fail",
                  message:error.message
                })
              } else if (error) {      
                res.status(400).json({
                  status:"Fail",
                  message:error.message
                })
              } 
        })
    

    }catch(err){
        console.log(err)

    }
});

module.exports=router