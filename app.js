const express = require('express');
const bodyParser=require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signUp.html");
})

app.post("/",function(req,res){
  var First_Name = req.body.FirstName;
  var Last_Name = req.body.LastName;
  var Email = req.body.Email;

  var data={
    members:[
      {
        email_address:Email,
        status:"subscribed",
        merge_fields:{
          FNAME:First_Name,
          LNAME:Last_Name
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us20.api.mailchimp.com/3.0/lists/99b9a4888c";
  const options={
    method:"POST",
    auth:"arpit045:0dbf56d55fb86eb05d2835c070f3bddf-us20"
  }
  const request = https.request(url,options,function(response){
    console.log(response.statusCode);
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

})
request.write(jsonData);
request.end();
});

app.post("/failure",function(req,result){
  result.redirect("/");
})


//

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on 3000");
});



// api key = 0dbf56d55fb86eb05d2835c070f3bddf-us20
// list id=99b9a4888c
