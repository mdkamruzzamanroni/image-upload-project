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
        const maxSize=1*1024*1024;//for 1MB
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
    

    }catch(err){
        console.log(err)

    }
});