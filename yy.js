// test2
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

app.get("/employee_login", (req,res)=>{
  writeEmployeeLogin(req,res);
});

app.get("/employee_home", (req,res)=>{
  employeeHome(req,res);
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
<div></div>
<button onclick="location.href = '/employee_login';" id="myButton" class="waves-effect waves-light btn-small" >Goto Employee login Page</button>
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

        con.query( //not valid
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
        );//not valid end
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


var poolBarcode;
var testBarcodes;
var count_poolmap = -1;
var count_poolmap2 = -1;
var get_poolBarcode = [];
var get_testBarcodes = [];

function writePoolMapping(req,res){
  let query = url.parse(req.url, true).query;

  let html = `
  <!DOCTYPE html>
  <html lang="en">  
  <head>
  
  </head>
  <body>
  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pool Mapping Page</div>
  <div>&nbsp;&nbsp;</div>
  <form action="/mapping_table" method="get"> 
    <div style="clear:both"> 
      <label style="width:120px;height:22px;float:left;" for="pool_barcode">Pool BarCode:</label>
      <input style="width:150px;height:18px;float:left;" type="text" name="pool_barcode" required /> 
    </div>
    <div style ="clear:both">
      <label style="width:120px;height:22px;float:left;" for="test_barcode">Test BarCodes:</label>
      <table style="width:100%" id ="to_expand">
        <tr> <input style="width:150px;height:18px;float:left;" type="text" name="test_barcode" required />  </tr>
      </table>
      <button onclick="return add_more_rows()" id="add" class="float-left submit-button" >Add More Rows</button>
    </div>
    
    <input style="width:80px;height:20px;float:left;" type="submit" class="btn btn-primary btn-block" value="ADD" /> 
  </form>
  <script>
    <!--
    var test_temp01=0;
    function add_more_rows(){
      test_temp01++;
      var table = document.getElementById("to_expand");
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      cell1.innerHTML = '<input style="width:150px;height:18px;float:left;" type="text" name="test_barcode" required />';
      
      // cell1.innerHTML += '<button onclick="testf1()" id="add"+test_temp01 class="float-left submit-button" >delete Rows</button>';
      
      if(document.getElementById("to_expand").rows.length-1 == 0){
        document.getElementById("test_hid_but").style.display='none';
      }else{
        document.getElementById("test_hid_but").style.display='inline';
      }
      
      console.log(test_temp01);
    }
    function testf1(){
      console.log("before",test_temp01);
      test_temp01 = test_temp01 - 1;
      console.log("after",test_temp01);
      // console.log("add"+x);
      var table = document.getElementById("to_expand");
      table.deleteRow(document.getElementById("to_expand").rows.length-1);
      if(document.getElementById("to_expand").rows.length-1 == 0){
        document.getElementById("test_hid_but").style.display='none';
      }else{
        document.getElementById("test_hid_but").style.display='inline';
      }
    }
    -->
  </script>
  <div id="test_hid_but">&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="testf1()" id="add"+test_temp01 class="float-left submit-button" >delete Rows</button></div>
  <script>
    <!--
      document.getElementById("test_hid_but").style.display='none';
    -->
  </script>
  `
  app.get('/mapping_table',function(req,res){
    poolBarcode = req.query.pool_barcode;
    testBarcodes = req.query.test_barcode;
    console.log(poolBarcode);
    console.log(testBarcodes);
    console.log("testBarcodes length:",testBarcodes.length,"0nd:",testBarcodes[0]);

    var ifhasval = 0;
    for(var i = 0; i<testBarcodes.length; i++){
      console.log("ifhasval START!!",testBarcodes[i]);
      con.query(
        `select * from EmployeeTest where testBarcode  = `+ testBarcodes[i] +`;`,
        function(err, result) {
          if(err) {
            console.log("ifhasval ERR!!");
          }else if(result.length == 0){
            console.log("ifhasval ????");
            
          }else if(result.length>0){
            ifhasval++;
            console.log("ifhasval PASS!!");
            if(ifhasval == testBarcodes.length){
              con.query(
                `INSERT INTO poolmap VALUES ('`+poolBarcode+`','`+testBarcodes +`');`,
                function(err,result){
                  if(err){
                    console.log("Insert Error in poolmap");
                  }else{
                    console.log("pool map Insert success ");
                  }
                }
              )
            }

          }
        }
      );
    }

    
      
    
    

    res.redirect('/pool_mapping');
  });
  html +=`
  <div>&nbsp;&nbsp;</div>
  <div>&nbsp;&nbsp;</div>
  <div style="clear:both">
    <div style="width:70px;height:20px;float:left;"></div>
    <div style="width:120px;height:20px;float:left;">Pool Barcode</div>
    <div style="width:100px;height:20px;float:left;">Test barcodes</div>
  </div>
    `
    con.query(
      `SELECT * FROM poolmap;`,
      function(err,result){
        if (err) {
          console.log("err in select from poolmap table");
        }else{
          count_poolmap = result.length;
          console.log("count:",count_poolmap);
          for (var i = 0; i < result.length; i++) {
            get_poolBarcode[i] = result[i].poolBarcode;
            get_testBarcodes[i] = result[i].testBarcode;
            console.log(get_poolBarcode[i],"   ",get_testBarcodes[i]);
          }
          
          
         
      }
    }
    );

    app.get('/pool_mapping_delete',function(req,res){
      console.log("o");
      console.log("try to delete 2:",req.query.delete2);
      con.query(
        `DELETE FROM PoolMap WHERE poolBarcode = "`+ req.query.delete2 +`";`,
        function(err, result){
          if (err) {
            console.log("delete2 error!");
          }else{
            console.log("delete2 success!");
            
          }
        }
      ) 
      res.redirect('/pool_mapping');
    });
    
    
    con.query(
      `SELECT * FROM poolmap;`,
      function(err,result){
        if (err) {
          console.log("err in select from poolmap table");
        }else{
          count_poolmap2 = result.length;
          console.log("count2:",count_poolmap2);
          for (var i = 0; i < result.length; i++) {
            get_poolBarcode[i] = result[i].poolBarcode;
            get_testBarcodes[i] = result[i].testBarcode;
            console.log(get_poolBarcode[i],"   ",get_testBarcodes[i]);
          }

          console.log("test_c1",count_poolmap2);
          for (var i = 0; i< count_poolmap2; i++){
            console.log("start adding");
            console.log(get_poolBarcode[i],"   ",get_testBarcodes[i]);
            html +=`
            <div style="clear:both">
              <form style="width:70px;height:20px;float:left;" action="/pool_mapping_delete" method="get">
                <button name = "delete2" value="` + get_poolBarcode[i] + `" > delete </button></form>
              <div style="width:120px;height:20px;float:left;">` +get_poolBarcode[i]+`</div>
            <div style="width:100px;height:20px;float:left;">`+get_testBarcodes[i] + `</div>
            </div>
            `
          }

          
          
          html += `</body>`;
          res.write(html);
          res.end();
          
      }
    }
    )
    
  
};

var wellBarcode;
var poolBarcode;
var resultStatus;
var get_wellBarcode_wellTesting = [];
var get_poolBarcode_wellTesting = [];
var get_resultStatus = [];
var count_wellTesting = -1;

function writeWellTesting(req, res){
  let query = url.parse(req.url, true).query;

  let html = `
  <!DOCTYPE html>
  <html lang="en">  
  <head>
  
  </head>
  <body>
  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Well Testing Page</div>
  <div>&nbsp;&nbsp;</div>
  <form action="/well_testing_table" method="get"> 
    <div style="clear:both"> 
      <label style="width:120px;height:22px;float:left;" for="well_barcode">Well barCode:</label>
      <input style="width:150px;height:18px;float:left;" type="text" name="well_barcode" required /> 
    </div>
    <div style ="clear:both">
      <label style="width:120px;height:22px;float:left;" for="pool_barcode">Pool barCode:</label>
      <table style="width:100%" id ="to_expand">
        <tr> <input style="width:150px;height:18px;float:left;" type="text" name="pool_barcode" required />  </tr>
      </table>
      <div>Result:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select class="selectpicker" data-style="btn-info" name="selectpicker">
      <optgroup label="Select">
          <option name="aa" value="0">in progress</option>
          <option name="bb" value="1">negative</option>
          <option name="cc" value="2">positive</option>
      </optgroup>
  </select>      
      </div>
   
    </div>
 
    
    <input style="width:80px;height:20px;float:left;" type="submit" class="btn btn-primary btn-block" value="ADD" /> 
  </form>`;

  app.get('/well_testing_table',function(req,res){
      wellBarcode = req.query.well_barcode;
      poolBarcode = req.query.pool_barcode;
      resultStatus = req.query.selectpicker;
      if (resultStatus == "0"){
        resultStatus = "in progress";
      }else if(resultStatus == "1"){
        resultStatus = "negative";
      }else if(resultStatus == "2"){
        resultStatus = "positive";
      }
      console.log(wellBarcode);
      console.log(poolBarcode);
      console.log(resultStatus);
      console.log(typeof(resultStatus));

      // var get_testBarcode = [];
      // var get_employeeID = [];
      // var count_EmployeeTest = -1;
      // var employeeID;
      // var testBarcode;
      // var temp_delete;


      con.query(
        `INSERT INTO welltesting VALUES ('`+ poolBarcode +`' , '`+ wellBarcode +`' , '2020-12-12' , '2020-12-12','`+ resultStatus +`');`,
        function(err, result){
        
        if (err) {
          console.log("err in well testing");
        }else{
          console.log("well testing table insert success");
  
          con.query( //not valid
            `SELECT count(*) as dddddd FROM welltesting;`,
            function(err, result){
              if (err) {
                console.log("err in well testing");
              }else if(result.length>0){
                count_wellTesting = result[0].dddddd;
                console.log("count:",result[0].dddddd);
            }}
          );
  
          con.query(
            `SELECT * FROM wellTesting;`,
            function(err, result){
              if (err) {
                console.log("err in select from wellTesting");
              }else if(result.length>0){
                count_wellTesting = result.length;
                for (var i = 0; i < result.length; i++) {
                  get_wellBarcode_wellTesting[i] = result[i].wellBarcode;
                  get_poolBarcode_wellTesting[i] = result[i].poolBarcode;
                  get_resultStatus[i] = result[i].resultStatus;

                  // console.log(get_testBarcode[i],"   ",get_employeeID[i]);
                }
            }}
          );//not valid end
          res.redirect('/well_testing');
        }
  
      });
      });
  
    html +=`
              <div>&nbsp;&nbsp;</div>
              <div>&nbsp;&nbsp;</div>
              <div style="clear:both">
                <div style="width:70px;height:20px;float:left;"></div>
                <div style="width:120px;height:20px;float:left;">Well barcode</div>
                <div style="width:100px;height:20px;float:left;">Pool barcode</div>
                <div style="width:100px;height:20px;float:left;">Result</div>
              </div>
    `;
    con.query(
      `SELECT * FROM welltesting;`,
      function(err,result){
        if (err) {
          console.log("err in select from welltesting table");
        }else{
          count_poolmap = result.length;
          console.log("count:",count_poolmap);
          for (var i = 0; i < result.length; i++) {
            get_wellBarcode_wellTesting[i] = result[i].wellBarcode;
            get_poolBarcode_wellTesting[i] = result[i].poolBarcode;
            get_resultStatus[i] = result[i].result;
            console.log(get_wellBarcode_wellTesting[i]+"    "+get_poolBarcode_wellTesting[i]+"   "+get_resultStatus[i]);
          }   
        }
      });
      app.get('/well_testing_delete',function(req,res){
        console.log("o");
        console.log("try to delete 2:",req.query.delete3);
        con.query(
          `DELETE FROM welltesting WHERE wellBarcode = "`+ req.query.delete3 +`";`,
          function(err, result){
            if (err) {
              console.log("delete2 error!");
            }else{
              console.log("delete2 success!");
              
            }
          }
        ) 
        res.redirect('/well_testing');
      });

      con.query(
        `SELECT * FROM welltesting;`,
        function(err,result){
          if (err) {
            console.log("err in select from welltesting table");
          }else{
            count_poolmap2 = result.length;
            console.log("count2:",count_poolmap2);
            for (var i = 0; i < result.length; i++) {
              get_wellBarcode_wellTesting[i] = result[i].wellBarcode;
            get_poolBarcode_wellTesting[i] = result[i].poolBarcode;
            get_resultStatus[i] = result[i].result;
            console.log(get_wellBarcode_wellTesting[i]+"    "+get_poolBarcode_wellTesting[i]+"   "+get_resultStatus[i]);
            }
  
            console.log("test_c1",count_poolmap2);
            for (var i = 0; i< count_poolmap2; i++){
              console.log("start adding");
              //console.log(get_poolBarcode[i],"   ",get_testBarcodes[i]);
              html +=`
            <div style="clear:both">
              <form style="width:70px;height:20px;float:left;" action="/well_testing_delete" method="get">
                <button name = "delete3" value="` + get_wellBarcode_wellTesting[i] + `" > delete </button></form>
              <div style="width:120px;height:20px;float:left;">` +get_wellBarcode_wellTesting[i]+`</div>
            <div style="width:100px;height:20px;float:left;">`+get_poolBarcode_wellTesting[i] + `</div>
            <div style="width:100px;height:20px;float:left;">`+get_resultStatus[i] + `</div>
            </div>
            `;
            }

             
          html += `</body>`;
          res.write(html);
          res.end();
          }
        });
      

      
  // res.write(html);
  // res.end();
};



var employeeEmail;
var employeePassword;
function writeEmployeeLogin(req,res){
  res.writeHead(200, {"Content-Type": "text/html"});
  let query = url.parse(req.url, true).query;
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
<b2>Employee Login</b2>
<form action="/myform1" method="get"> 
    <div class="row">
    <div class="input-field col s6">  
      <label for="employee_email">Email</label>
      <input type="text" name="employee_email" required /> 
    </div></div>
    <div class="row">
    <div class="input-field col s6">
      <label for="employee_password">Password</label>
      <input type="password" name="employee_password" required /> 
    </div></div>
    <input type="submit" class="btn btn-primary btn-block" value="Log In" /> 
</form> 
  </body>
  `;
  res.write(html);
  res.end();

  var employeeID;

  app.get('/myform1', function(req, res){  
    // temp_labid = req.query.lab_id;
    // temp_labps = req.query.lab_password;
    employeeEmail = req.query.employee_email;
    employeePassword = req.query.employee_password;
    // res.send('Your Text:' +myText);  
    console.log(employeeEmail);
    console.log(employeePassword);

    // if(temp_labid=="ss"){
    //   // res.end('<p><a href="/schedule">Click here!</a></p>\n');
    //   res.redirect('/lab_page');
    // }

    con.query(
      `select * from Employee where employeeID = `+ employeeEmail +` and passcode = `+ employeePassword +``,
      function(err, result) {
        if(err) {
          console.log("ERR!!");
          
          // throw err;
        }else if(result.length>0){
          // console.log("hi  "+result);
          res.redirect('/employee_home');
        }
        
      }
    );
    

  }); 


}

function employeeHome(req,res){
  let query = url.parse(req.url, true).query;
  let html = `
  <!DOCTYPE html>
  <html lang="en">  
  <head>
  
  </head>
  <body>
  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Employee Home</div>
  <div>&nbsp;&nbsp;</div>
  <div class = "column">
    <div style ="float: left">Collection date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</div>
    <div >Result </div>
  </div>
  `;

    sql = "SELECT * FROM welltesting ";
    con.query(sql, function(err, result){
        if (err){
          console.log("aa")
        }else{

          for(let item of result){
            console.log(typeof(item.testingStartTime.toString()) + "   "+item.result);

            html +=
            `
          
            <div>`+ item.testingStartTime.toString().substring(4,15)+`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`+ item.result+`</div>
            ` 
          }
        }
        
  html += "</body>";
  res.write(html);
  res.end();

    });
}