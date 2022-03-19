require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//middleware

app.use(cors());
app.use(express.json());

//import routes
const userRoute = require("../Routes/userRouter");
app.use("/api/users", userRoute);

const pollRoute = require("../Routes/pollRouter");
app.use("/api/polls", pollRoute);

//connect to DB
mongoose.connect(
  "mongodb+srv://prun:yUKWvgUK7GQGnv9@pollrolldb.yrd5e.mongodb.net/PollRollDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "pollroll_db",
  },
  () => console.log("connected db")
);

//start listening to the server
//app.listen(3558);

module.exports.handler = serverless(app);
