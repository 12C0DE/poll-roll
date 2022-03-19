require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//middleware

app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.json({
    path: "home",
  });
});

app.get("/posts", (req, res) => {
  res.send("we are at posts");
});

//import routes
const userRoute = require("../Routes/userRouter");
app.use("/api/users", userRoute);

const pollRoute = require("../Routes/pollRouter");
app.use("/api/polls", pollRoute);

const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    path: "home",
  });
});
app.use("/", router);

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
