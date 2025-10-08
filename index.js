const { faker } = require('@faker-js/faker');

const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sbjain',
  password: 'NewPassword@123!'
});



//Inserting new data into table


let q = "INSERT INTO users (id, username, email, password) VALUES ?";
let users =[
  ["123pk", "Prahgttik", "koa@gmail.com", "Psd23"],
  ["123add", "Prsdatika", "ko@gmail.coxma", "P23a"]
];

try{
  connection.query(q , [users], (err, result)=>{
    if (err) throw err;
    console.log(result);
  });

}catch(err){
  console.log(err);
}

connection.end();



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