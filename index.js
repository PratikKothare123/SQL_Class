const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express= require("express");
const app= express();


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sbjain',
  password: 'NewPassword@123!'
});

app.get("/",(req,res)=>{
  res.send("Welcome To Home Page!!!");
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
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}


// console.log(createRandomUser());

// try{
//   connection.query(q , [users], (err, result)=>{
//     if (err) throw err;
//     console.log(result);
//   });

// }catch(err){
//   console.log(err);
// }