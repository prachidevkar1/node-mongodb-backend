const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user=require('./model/User')


const server = express();
 server.use(cors());

server.use(bodyParser.json());


mongoose.connect('mongodb+srv://prachidevkar1328:prachi%401328@cluster0.1792gqs.mongodb.net/testDB')  // you can name your DB here like 'testDB'
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Connection error:", err));

// Create Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  fullName: String,
  userName: String,
  age: Number,
  password: String
});

const User = mongoose.model('User', userSchema);

server.post('/register', async (req, res) => {
  try {
    const { fullName, userName, age, password } = req.body;

    const userObj = new User({
      fullName,
      userName,
      age,
      password
    });

    await userObj.save()

    res.json({
      status: true,
      message: 'User successfully registered'
    });
  } catch (err) {
    res.json({
      status: false,
      message: `${err}`
    });
  }
});
server.post('/login', async (req, res) => {
    try {
      const { userName, password } = req.body;
  
      
      if (!userName || !password) {
        return res.json({
          status: false,
          message: 'Username or password is missing',
        });
      }
  
      const userExist = await user.findOne({ userName });
  
      if (!userExist) {
        return res.json({
          status: false,
          message: 'User not found',
        });
      }
  
      if (password !== userExist.password) {
        return res.json({
          status: false,
          message: 'Wrong password',
        });
      }
  
      
      return res.json({
        status: true,
        message: 'Login successful',
        user: userExist, 
      });
  
    } catch (err) {
      res.json({
        status: false,
        message: `Error: ${err.message}`,
      });
    }
  });
  



  module.exports = server;