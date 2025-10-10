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
  q='SELECT count(*) FROM users';
try{
  connection.query(q ,(err, result)=>{
    if (err) throw err;
    console.log(result[0]["count(*)"]);     // in output display key value pair in array, so we print 0th index then we want only value so access key 
    res.send("Successful !!!");
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
//   connection.query(q , [users], (err, result)=>{
//     if (err) throw err;
//     console.log(result);
//   });

// }catch(err){
//   console.log(err);
// }

//Inserting new data into table

