let mongoose = require('mongoose');

const khachhangSchema = new mongoose.Schema({
    usernamekh :{
        type:String,
        require:true,
    },passkh :{
        type:String,
        require:true,
    },namekh:{
      type:String,
      require:true,
    },
    phonekh :{
        type:String,
        require: true,
    },addresskh:{
        type:String,
        require:true,
    }

})
module.exports = khachhangSchema;