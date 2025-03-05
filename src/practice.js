const express=require('express')
const app=express();

// app.get("/index",(req,res)=>{
//     res.send({firstname:'Gaurav',Lastname:'Rai',age:25})
// });
app.use("/user",(req,res,next)=>{
    console.log("user router is working fine");
    //next();
   //res.send("User router");
   next();

},(req,res,next)=>{
    console.log("user router 2 is working fine");
    //res.send("User router 2");
    next();
},
(req,res)=>{
    console.log("user router 3 is working fine");
    res.send("User router 3");
}
);




// app.listen(3000,()=>{
//     console.log("server is running at port number 3000");
// });