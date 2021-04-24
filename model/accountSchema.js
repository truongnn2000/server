let mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username :{
        type:String,
        require:true,
    },pass:{
        type:String,
       require:true,
      },
    phone:{
        type:String,
        require: true,
    }

});
module.exports = accountSchema;