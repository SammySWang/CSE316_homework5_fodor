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

port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("server started!");
})

app.get("/test_collection", (req,res)=>{
  writeTestCollection(req,res);
});

app.get("/pool_mapping", (req,res)=>{
  writePoolMapping(req,res);
});

app.get("/well_testing", (req,res)=>{
  writeWellTesting(req,res);
});


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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
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
        }else if(result.length>0){
          // console.log("hi  "+result);
          res.redirect('/lab_page');
        }
        
      }
    );
    

  }); 
  
};

function writeSchedule(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
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
  
};


var get_testBarcode = [];
var get_employeeID = [];
var count_EmployeeTest = -1;
var employeeID;
var testBarcode;
var temp_delete;

function writeTestCollection(req, res){
  let query = url.parse(req.url, true).query;
  let html = `
  <!DOCTYPE html>
  <html lang="en">  
  <head>
  
  </head>
  <body>
  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test Collection</div>
  <div>&nbsp;&nbsp;</div>
  <form action="/collection_table" method="get"> 
    
    <div style="clear:both"> 
      <label style="width:120px;height:22px;float:left;" for="employee_id">Employee ID:</label>
      <input style="width:150px;height:18px;float:left;" type="text" name="employee_id" required /> 
    </div>
    
    <div style="clear:both" class="input-field col s6">
      <label style="width:120px;height:22px;float:left;" for="test_barcode">Test barcode:</label>
      <input style="width:150px;height:18px;float:left;" type="text" name="test_barcode" required /> 
    </div>
    <div style="clear:both">
      <div style="width:60px;height:20px;float:left;"></div>
      <input style="width:80px;height:20px;float:left;" type="submit" class="btn btn-primary btn-block" value="ADD" /> 
    </div>
  </form> 
  
  `;


  app.get('/collection_table', function(req, res){ 

    employeeID = req.query.employee_id;
    testBarcode = req.query.test_barcode;

    console.log(employeeID);
    console.log(testBarcode);
    console.log(temp_labid);
    // let add = `INSERT INTO EmployeeTest VALUES (`+employeeID+`, `+testBarcode+`)`;
    //sql = "SELECT * FROM employeetest";
    //let sql = `INSERT INTO EmployeeTest where employeeID = `+ employeeID +` and testBarcode = `+ testBarcode;
    //var add = "INSERT INTO EmployeeTest (testBarcode, employeeID) VALUES ('1', '3')";
    // var sql = "SELECT * FROM employeeTest";
    
    con.query(
      `INSERT INTO EmployeeTest VALUES ('`+ employeeID +`' , '`+ testBarcode +`' , '2020-12-6' , '`+ temp_labid +`');`,
      function(err, result){
      
      if (err) {
        console.log("err in collection table");
      }else{
        console.log("collection table insert success");

        con.query(
          `SELECT count(*) as dddddd FROM EmployeeTest;`,
          function(err, result){
            if (err) {
              console.log("err in collection table");
            }else if(result.length>0){
              count_EmployeeTest = result[0].dddddd;
              console.log("count:",result[0].dddddd);
          }}
        );

        con.query(
          `SELECT * FROM EmployeeTest;`,
          function(err, result){
            if (err) {
              console.log("err in select from collection table");
            }else if(result.length>0){
              count_EmployeeTest = result.length;
              for (var i = 0; i < result.length; i++) {
                get_testBarcode[i] = result[i].testBarcode;
                get_employeeID[i] = result[i].employeeID;
                // console.log(get_testBarcode[i],"   ",get_employeeID[i]);
              }
          }}
        );
        res.redirect('/test_collection');
        

      }

    });

    });

    html +=`
            <div>&nbsp;&nbsp;</div>
            <div>&nbsp;&nbsp;</div>
            <div style="clear:both">
              <div style="width:70px;height:20px;float:left;"></div>
              <div style="width:120px;height:20px;float:left;">Employee ID</div>
              <div style="width:100px;height:20px;float:left;">Test barcode</div>
            </div>
              `
              
    con.query(
      `SELECT * FROM EmployeeTest;`,
      function(err, result){
        if (err) {
          console.log("err in select from collection table");
        }else{
          count_EmployeeTest = result.length;
          
          for (var i = 0; i < result.length; i++) {
            get_testBarcode[i] = result[i].testBarcode;
            get_employeeID[i] = result[i].employeeID;
            console.log(get_testBarcode[i],"   ",get_employeeID[i]);
            
            // html +=`
            // <div style="clear:both">
            //   <form style="width:70px;height:20px;float:left;" action="/test_collection" method="get">
            //       <button name = "delete1" value="` + get_testBarcode[i] + `" > delete </button></form>

            //   <div style="width:120px;height:20px;float:left;">` +get_testBarcode[i]+`</div>
            //   <div style="width:100px;height:20px;float:left;">`+get_employeeID[i] + `</div>
            // </div>
            // `
            
          }
          console.log("try to delete 33:",query.delete1);
          temp_delete = query.delete1;
      }
      console.log("test3:",count_EmployeeTest," ",get_testBarcode[0]);
      for (var i = 0; i< count_EmployeeTest; i++){
        html +=`
        <div style="clear:both">
          <form style="width:70px;height:20px;float:left;" action="/test_collection_delete" method="get">
              <button name = "delete1" value="` + get_testBarcode[i] + `" > delete </button></form>
          <div style="width:120px;height:20px;float:left;">` +get_testBarcode[i]+`</div>
          <div style="width:100px;height:20px;float:left;">`+get_employeeID[i] + `</div>
        </div>
        `

      }

      
      
      con.query(
        `DELETE FROM EmployeeTest WHERE testBarcode = "`+ req.query.delete1 +`";`,
        function(err, result){
          if (err) {
            console.log("delete error!");
          }else{
            console.log("delete success!");
            
          }
        }
      ) 
      app.get('/test_collection_delete', function(req, res) {      
        // res.redirect('/test_collection');
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaddddddddddddddddddddd:",req.query.delete1)
        con.query(
          `DELETE FROM EmployeeTest WHERE testBarcode = "`+ req.query.delete1 +`";`,
          function(err, result){
            if (err) {
              console.log("delete error!");
            }else{
              console.log("delete success!");
              
            }
          }

        ) 
        res.redirect('/test_collection'); 
        // res.send('/test_collection');
        // res.sendFile(path.join(__dirname+'/test_collection'));
      });   
      // res.writeHead(301, { Location: '/test_collection' });
      html += `</body>`;
      res.write(html);
      res.end();

    }
      
    )
    
  
};

function writePoolMapping(req,res){

  let query = url.parse(req.url, true).query;

  let html = `
  <!DOCTYPE html>
  <html lang="en">  
  <head>
  
  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pool Mapping</div>
  <div>&nbsp;&nbsp;</div>
  <form action="/pool _table" method="get"> 
    
    <div style="clear:both"> 
      <label style="width:120px;height:22px;float:left;" for="pool_barcode">Pool barcode:</label>
      <input style="width:150px;height:18px;float:left;" type="text" name="pool_barcode" required /> 
    </div>
    
    <div style="clear:both" class="input-field col s6">
      <label style="width:120px;height:22px;float:left;" for="test_barcodes">Test barcodes:</label>
      <input style="width:150px;height:18px;float:left;" type="text" name="test_barcodes" required /> 
    </div>

    <div style="clear:both">
    <div style="width:120px;height:20px;float:left;"></div>
    <input style="width:120px;height:20px;float:left;" type="submit" class="btn btn-primary btn-block" value="Add more rows" /> 
    </div>

      <div style="width:60px;height:20px;float:left;"></div>
      <input style="width:80px;height:20px;float:left;" type="submit" class="btn btn-primary btn-block" value="Submit pool" /> 
      </div>
  </form>
  `;

  html += 
  `
  <table border = "1">
  <tr>
  <td>ss</td>
  <td>aa</td>
  </tr>
  </table>
  
  `
  ;

  app.get('/pool_table', function(req, res){ 

    poolBarcode = req.query.pool_barcode;
    testBarcodes = req.query.test_barcodes;

    console.log(poolBarcode);
    console.log(testBarcodes);

    });
  html += `</body>`;
  res.write(html);
  res.end();

};

function writeWellTesting(req, res){
  let query = url.parse(req.url, true).query;
  let html = `bbbbb`;
  res.write(html);
  res.end();
};