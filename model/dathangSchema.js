let mongoose = require('mongoose');

const dathangSchema=new mongoose.Schema({

    makhdh: {
        type: String,
        require: true,
    },tenspdh:{
        type: String,
        require: true,
    },tongtiendh:{
        type:String,
        require:true,
    },imagesdh:{
        type:String,
        require:true,
    }

});
module.exports= dathangSchema;