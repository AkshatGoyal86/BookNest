const mongoose=require('mongoose');

const listSchema1 = new mongoose.Schema({
    firstname:{
        type:String,
        // unique:true,
        required:true
    },

    lastname:{
        type:String,
        // unique:true,
        required:true
    },

    number:{
        type: Number,
        unique:true,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    message:{
        type:String,
        required:true
    },
})

const registerSchema1= new mongoose.model("contact",listSchema1);
module.exports=registerSchema1;