const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const app = express();

mongoose
  .connect(
    "mongodb+srv://tiger:" + process.env.MONGO_ATLAS_PW + "@cluster0-qrtqr.mongodb.net/mobileservice"
  )
  .then(() => {

    console.log("Connected to database!");
  })
  .catch(() => {

    console.log("Connection failed!");
  });


  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")));


/*****************************************************************************************************/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT,POST,PATCH,PUT,DELETE,GET"
    );
    return res.status(200).json({});
  }
  next();
});


const userRouter = require("./routes/user");

app.use("/api/user",userRouter);



const masterRouter = require("./routes/master");

app.use("/api/master",masterRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")));


//Begin  For deploy

app.use(express.static(path.join(__dirname,"public")));

app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname,'public/index.html'))
  });

//End  For deploy

module.exports = app;
