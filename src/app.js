console.log("i am gaurav rai this is my first project");


const express=require('express');
const app=express();
app.get("/index",(req,res)=>{
    // res.send("My first Get API");
    res.send({first_name:"Gaurav",Last_name:"Rai",Age:25,Address:"Lucknow"});
});
app.post("/index",(req,res)=>{
    res.send("My first Post API");

});
app.delete("/index",(req,res)=>{
    res.send("Delete successfully");
});





app.use("/hello",(req,res)=>{
    res.send("hey Gaurav what i am help you");
    // res.send({first_name:"Gaurav",Last_name:"Rai"});

});
app.use("/world",(req,res)=>{
    res.send("hey Gaurav What happend");

});
app.use("/home",(req,res)=>{
    res.send("hey roy kya kar rhha hai tu");
})
app.listen(3000,()=>{
    console.log("server is running at port number 3000");
});