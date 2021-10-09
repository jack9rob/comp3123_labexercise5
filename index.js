const express = require('express');
const app = express();
const router = express.Router();
let user_info = require('./user.json')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname + "/home.html");
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.send(JSON.stringify(user_info, null, 4))
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

// http://localhost:8081/login?username=bret&password=bret@123
router.get('/login', (req,res) => {
  let username = req.query.username
  let password = req.query.password
  let json_username = user_info['username']
  let json_password = user_info['password']
  if(username == json_username && password == json_password) {
    res.send({
      status: true,
      message: "User is valid"
    })
  } else if(username != json_username) {
    res.send({
      status: false,
      message: "User name is invalid"
    })
  } else {
    res.send({
      status: false,
      message: "Password is invalid"
    })
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
// http://localhost:8081/logout?username=bret
router.get('/logout', (req,res) => {
  let username = req.query.username
  res.send(`<b>${username} successfully logout.</b>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));