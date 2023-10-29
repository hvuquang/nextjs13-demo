//run from top -> bottom
const express = require("express");

//express app
const app = express();
const port = 3000;
const path = require("path");
// __dirname returns the root directory (best practice)
// need to enter the root folder first, then add the views folder
const options = {
  root: path.join(__dirname),
};
//routing
app.get("/", (req, res) => {
  res.sendFile("/views/index.html", options);
});

app.get("/about", (req, res) => {
  res.sendFile(`/views/about.html`, options);
});

//redirect
app.get('/contact',(req,res)=>{
    res.redirect('/about')
})

//404 page -> should place BOTTOM if not, it will run first cause of middleware
//app.use(): middleware function -> process incoming requests before reaching intended routes
//used for logging, authentication and error handling
app.use((req, res, next) =>{
    //set status to 404
    res.status(404).sendFile('/views/404.html',options);
})

//after listening for connections, trigger callback
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
