const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://grai6129:mmQ3dpFYFIa52q5y@namstenode.hbprd.mongodb.net/devTinder"
  );
};

module.exports=connectDB;
// connectDB()
//   .then(() => {
//     console.log("Connected to the database");
//   })
//   .catch((err) => {
//     console.error("Error in connecting to the database");
//   });
