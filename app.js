//jshint esversion:6

const express = require("express"); 
const bodyParser = require("body-parser");
const getDate = require(__dirname + "/date.js");  

const app = express(); 

const animals = ["shark", "giraffe", "penguin", "cheetah"]; 
const workItems = []; 

app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static("public"));

app.get("/", function(req, res){ 
  let currentDate = getDate.getDate(); 
  res.render("list", {listTitle: currentDate, theArray: animals});
}); 

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", theArray: workItems})
});

app.get("/about", function(req, res){
  res.render("about"); 
}); 

app.post("/", function(req, res){
  console.log(req.body); 
  var item = req.body.newItem; 
  
  if (req.body.list === "Work") {
    workItems.push(item); 
    res.redirect("/work"); 
  } else {
    animals.push(item); 
    res.redirect("/");  
  }
});

app.post("/work", function(req, res){
  workItems.push(req.body.newItem);
  res.redirect("/work");  
});

app.listen(3000, function(){
  console.log("Server started on port 3000!"); 
}); 