const express=require('express');
const router=express.Router();
const multer= require("multer");

// for image resizing require below 3 packages

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
 


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
        const maxSize=1*1024*1024;//for 6MB
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
//SyntaxError: await is only valid in async function
          upload(req,res, async(error)=> {  
            console.log("body test", req.body);
            console.log("files test", req.files);

// for image resizing
const files = await imagemin(['public/media/*.{jpg,png,jpeg,webp}'], {
	destination: 'public/media',
	plugins: [
		imageminJpegtran(),
		imageminPngquant({
			quality: [0.6, 0.8]
		})
	]
});
   console.log("===>",files);

   res.download(files[0].destinationPath);

   //error handling of Multer 
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