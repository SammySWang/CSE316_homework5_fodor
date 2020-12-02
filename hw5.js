var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "030101",
    database: "mydb"
});

const express = require("express");
const app = express();
const url = require('url');
const { response } = require("express");



app.get("/",(req,res) => {
  writeSearch(req,res);
});

app.get("/lab_page", (req,res)=>{
  writeSchedule(req,res);
});

app.get("/test_collection", (req,res)=>{
  writeTestCollection(req,res);
});

app.get("/pool_mapping", (req,res)=>{
  writePoolMapping(req,res);
});

app.get("/well_testing", (req,res)=>{
  writeWellTesting(req,res);
});


port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("server started!");
})


//lab login page get user input
var temp_labid;
var temp_labps;


function writeSearch(req,res){
  res.writeHead(200, {"Content-Type": "text/html"});
  let query = url.parse(req.url, true).query;
  
  let search = query.search ? query.search : "";

  // console.log("111a");

  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
<!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js">
 
    </script>
  <title> Spring 2021 CSE Class Find </title>
</head>
<script>
</script>
<body>
<b2>Lab Login</b2>
<form action="/myform" method="get"> 
    <div class="row">
    <div class="input-field col s6">  
      <label for="lab_id">Lab ID</label>
      <input type="text" name="lab_id" required /> 
    </div></div>
    <div class="row">
    <div class="input-field col s6">
      <label for="lab_password">Password</label>
      <input type="password" name="lab_password" required /> 
    </div></div>
    <input type="submit" class="btn btn-primary btn-block" value="Log In" /> 
</form> 
  </body>
  `;
  
  res.write(html);
  res.end();


  // var temp_labid;
  // var temp_labps;
  app.get('/myform', function(req, res){  
    temp_labid = req.query.lab_id;
    temp_labps = req.query.lab_password;
    // res.send('Your Text:' +myText);  
    console.log(temp_labid);
    console.log(temp_labps);

    // if(temp_labid=="ss"){
    //   // res.end('<p><a href="/schedule">Click here!</a></p>\n');
    //   res.redirect('/lab_page');
    // }

    con.query(
      `select * from LabEmployee where labID = `+ temp_labid +` and password = `+ temp_labps +``,
      function(err, result) {
        if(err) {
          console.log("ERR!!");
          // throw err;
        }else{
          // console.log("hi  "+result);
          res.redirect('/lab_page');
        }
        
      }
    );
    

  }); 
};

function writeSchedule(req, res){
  
  let query = url.parse(req.url, true).query;
  // let addQuery = `INSERT INTO saved SELECT * FROM courses WHERE courses.id="` + query.add + `";`
  console.log("yes"+temp_labid);

  let html = `
    <div>Lab Home</div>
    <button onclick="location.href = '/test_collection';" id="myButton" class="float-left submit-button" >Test Collection</button><br><br>
    <button onclick="location.href = '/pool_mapping';" id="myButton" class="float-left submit-button" >Pool Mapping</button><br><br>
    <button onclick="location.href = '/well_testing';" id="myButton" class="float-left submit-button" >Well Testing</button>
    `;
  res.write(html);
  res.end();
}

function writeTestCollection(req, res){
  let query = url.parse(req.url, true).query;
  let html = `wwww`;
  res.write(html);
  res.end();
}

function writePoolMapping(req,res){

  let query = url.parse(req.url, true).query;
  let html = `aaaaa`;
  res.write(html);
  res.end();

}
function writeWellTesting(req, res){
  let query = url.parse(req.url, true).query;
  let html = `bbbbb`;
  res.write(html);
  res.end();
}