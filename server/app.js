const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//middleware

app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("we are at home");
});

app.get("/posts", (req, res) => {
  res.send("we are at posts");
});

//import routes
const userRoute = require("./Routes/userRouter");
app.use("/users", userRoute);

const pollRoute = require("./Routes/pollRouter");
app.use("/polls", pollRoute);

//connect to DB
mongoose.connect(
  process.env.REACT_APP_DB_CONNECTION,
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
app.listen(process.env.PORT || 3558);
