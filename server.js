const express= require('express');
const app=express();
const helmet= require('helmet');
const mongoose= require('mongoose');
require("dotenv").config();

const morgan= require("morgan");
const cors= require("cors");
const{readdirSync}=require("fs");

//middleware
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//DB connection
// mongoose
//     .connect(process.env.DATABASE)
//     .then(()=>console.log("DB connected") )
//     .catch((err)=>console.log("DB Error=>",err));

//routes middleware    (readdirSync("./routes")this portion will return an:ARRAY)
readdirSync("./routes").map(r=>app.use("/api/v1",require(`./routes/${r}`)));

//server
const port=process.env.PORT || 8000;


app.listen(port,() => {
    console.log(`App is  running on port ${port}`);
});