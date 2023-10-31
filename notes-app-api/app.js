//run from top -> bottom
const express = require("express");
const morgan = require("morgan");


//express app
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require('mongoose')

//routes
const blog_router = require('./routes/blogRoutes')

var bodyParser = require("body-parser");

//install bodyParse
//parse data in req body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// apply route into app.js
// route bắt đầu bằng blogs
app.use('/blogs', blog_router)


const dbURI = `mongodb+srv://huyv:test123456@cluster0.hq6re8u.mongodb.net/blog-db?retryWrites=true&w=majority`;
mongoose.connect(dbURI)
.then(() => {
    console.log("Connected to MongoDB")
    //listen to request AFTER connecting with db
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
      });
})
.catch((err) => console.log(err))
//this callback trigger when connected to db


// __dirname returns the root directory (best practice)
// need to enter the root folder first, then add the views folder
const options = {
  root: path.join(__dirname),
};

//middleware for logging
app.use(morgan("dev"));

//middleware for static files
//make files public to access
//sometimes you need to specify what files can be public
app.use(express.static("assets"));


//routing
app.get("/", (req, res) => {
  res.sendFile("/views/index.html", options);
});

//after running, page loading -> this middle don't know what to do to move to next middleware
// THEN -> using next()
app.use((req, res, next) => {
  console.log("new request made: ");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  //need to pass as a parameter
  next();
});

app.get("/about", (req, res) => {
  res.sendFile(`/views/about.html`, options);
});

//if get /about
//middleware below will be not executed
app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});

//redirect
app.get("/contact", (req, res) => {
  res.redirect("/about");
});
app.get("/contact-us", (req, res) => {
  res.redirect("/about");
});

//404 page -> should place BOTTOM if not, it will run first cause of middleware
//app.use(): middleware function -> process incoming requests before reaching intended routes
//used for logging, authentication and error handling
app.use((req, res, next) => {
  //set status to 404
  res.status(404).sendFile("/views/404.html", options);
});

//after listening for connections, trigger callback
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });
