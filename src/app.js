const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
app.use(express.json());
app.post("/signup", async (req, res) => {
  //validate the data
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, rollNumber, password } = req.body;
    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      rollNumber,
      password: passwordHash,
    });
    await user.save();
    res.send("Data saved successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invaild credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login success!!");
    } else {
      throw new Error("invaild credentials");
    }
  } catch (err) {
    res.status(400).send("Error in login:" + err.message);
  }
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
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error in fetching data:" + err.message);
  }
});
// const users=User.find({})
// res.send(users);
// Feed Api -Get / feed  get all the users from the database
// app.get("/feed", async (req, res) => {
//   try {
//     const user = await User.findOne({});
//     if (!user) {
//       res.status(400).send("User not found");
//     } else {
//       res.send(user);
//     }

//     res.send(users);
//   } catch (err) {
//     res.status(400).send("error in fetching data:" + err.message);
//   }
// });

//delete by user for use userId from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch {
    res.status(400).send("Error in deleting user:" + err.message);
  }
});
//update the user by userId from the database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills length should be less than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runVaildators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update failed:" + err.message);
  }
});

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
