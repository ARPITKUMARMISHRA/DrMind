const express=require('express');
const app=express();

app.use('/',require('./routes'));
app.listen(5000, (err)=>{
    if(err) 
    console.log('error while starting server');
    else
  console.log("server started at http://localhost:5000");
}
);