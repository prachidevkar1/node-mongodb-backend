const mongoose=require('mongoose');
const userScheme=mongoose.Schema({
    fullName:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    age:{type:Number,required:true},
    password:{type:String,required:true}

})

module.exports=mongoose.model('user',userScheme)