const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express= require("express");
const app= express();
const path=require("path");
const methodOverride= require("method-override");



app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "/views"));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sbjain',
  password: 'NewPassword@123!'
});

// HOME ROUTE
app.get("/",(req,res)=>{
  q='SELECT count(*) FROM users';
try{
  connection.query(q ,(err, result)=>{
    if (err) throw err;
    console.log(result[0]["count(*)"]); 
    let value=result[0]["count(*)"]    // in output display key value pair in array, so we print 0th index then we want only value so access key 
    res.render("home.ejs",{value});
  });

}catch(error){
  console.log(error);
  res.send("Some error ocured in DB!!!");
}
});

// SHOW ROUTE
app.get("/user",(req,res)=>{
  q= `SELECT * FROM users`;
  
  try{
  connection.query(q ,(err, users)=>{
    if (err) throw err;
    res.render("showusers.ejs",{users});
  });

}catch(err){
  console.log(err);
  res.send("Some error ocured in DB!!!");
}
});

// EDIT ROUTE
app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  q=`SELECT * FROM users WHERE id=${id}`;


try{
  connection.query(q ,(err, result)=>{
    if (err) throw err;
    let user=result[0];
    res.render("edit.ejs",{user});
  });
}catch(err){
  console.log(err);
  res.send("Some error ocured in DB!!!");
}
});


// UPDATE (DB) Route
app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let {password: formPass, username: Newusername}= req.body;
  q=`SELECT * FROM users WHERE id='${id}'`;

  try{
  connection.query(q ,(err, result)=>{
    if (err) throw err;
    let user = result[0];
    if (formPass !== user.password){
      res.send("Warning!!!");
    }else{
      let q2 =`UPDATE users SET username='${Newusername}' WHERE id='${id}'`;

      connection.query(q2,(err,result)=>{
        if (err) throw err;
        res.redirect("/user");
      });
    }
  });
}catch(err){
  console.log(err);
  res.send("Some error ocured in DB!!!");
}
});


let port=8080;
app.listen(port,()=>{
  console.log('App listing On port: ',port);
})

//Inserting new data into table






// connection.end();



let createRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}


// console.log(createRandomUser());

// try{
//   connection.query( [users], (err, result)=>{
//     if (err) throw err;
//     console.log(result);
//   });

// }catch(err){
//   console.log(err);
// }

//Inserting new data into table

