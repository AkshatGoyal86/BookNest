const mongoose=require('mongoose');

const listSchema2= new mongoose.Schema({

    fourimage1:{
        require:true,
        type:String
    },
    fourimage2:{
        require:true,
        type:String
    },
    fourimage3:{
        require:true,
        type:String
    },
    fourimage4:{
        require:true,
        type:String
    },
})

const registerSchema2= new mongoose.model ("add-product",listSchema2);
module.exports= registerSchema2;