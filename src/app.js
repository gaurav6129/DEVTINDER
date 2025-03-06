const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const user = require("./models/user");
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  // const user=new User({
  //   firstName:"Gaurav",
  //   lastName:"Rai",
  //   emailId:"at6269803@gmail.com",
  //   password:"12345688"
  // });
  //Save the data into the database
  try {
    await user.save();
    res.send("Data saved successfully");
  } catch (err) {
    res.status(400).send("Error in saving data:" + err.message);
  }
  //await user.save()
  //res.send("Data saved successfully");
});
//get the user by emailId
app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await user.find({ emailId: userEmail });
    //req.send(user);
    if (users.length == 0) {
      res.status(400).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error in fetching data:" + err.message);
  }
  //  const users= await user.find({emailId:userEmail})
  //  req.send(users );
});
// Feed Api -Get / feed  get all the users from the database
app.get("/feed", (req, res) => {
  try {
    const users = User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error in fetching data:" + err.message);
  }
  // const users=User.find({})
  // res.send(users);
  app.get("/feed", async (req, res) => {
    try {
      const user = await User.findOne({});
      if (!user) {
        res.status(400).send("User not found");
      } else {
        res.send(user);
      }

      res.send(users);
    } catch (err) {
      res.status(400).send("error in fetching data:" + err.message);
    }
  });
});
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
    const user= await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  }
  catch{
    res.status(400).send("Error in deleting user:"+err.message);

  }
})


connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("server is running at port number 3000");
    });
  })
  .catch((err) => {
    console.error("Error in connecting to the database");
  });

// app.listen(3000,()=>{
//     console.log("server is running at port number 3000");
// });
