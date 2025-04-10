const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/User'); 

const server = express();


server.use(cors());

server.use(bodyParser.json());

mongoose.connect('mongodb+srv://prachidevkar1328:prachi%401328@cluster0.1792gqs.mongodb.net/testDB')
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Connection error:", err));

server.post('/register', async (req, res) => {
  try {
    const { fullName, userName, age, password } = req.body;

    const userObj = new User({ fullName, userName, age, password });
    await userObj.save();

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

server.post('/login',async(req,res)=>{
  try{
      const{userName,password}=req.body
      const userExist=await User.findOne({userName})
      if(!userExist){
          return res.json({
              status:false,
              message:'user not found!!'
          })
      }
      if(password!==userExist.password){
          return res.json({
              status:false,
              message:'wrong password!!'
          })
      }
      res.json({
          status:true ,
          message:'login Succesful'
      })
  }catch (err){
      res.json({
          status:false,
          message:`Error${err} `  
      })
  }
})

server.listen(8055,()=>{
  console.log('Server started listening on port 8055')
})
