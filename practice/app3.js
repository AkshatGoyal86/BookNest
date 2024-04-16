var express= require('express');
const app=express();

const mongoose=require('mongoose');

var conn=mongoose.connect("mongodb+srv://akshatgoyal:Akshat862005@cluster0.zl02xac.mongodb.net/testing?retryWrites=true&w=majority&appName=Cluster0",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>console.log("connection successfully.."))
.catch((err)=>console.log(err));

// module.exports=conn;

// schema
// a mongoose schema defines the structure of the document

const listSchema = new mongoose.Schema({
    name:
        {type:String,
        required:true
    },

    email:
        {type:String,
        required:true
    },

    active:Boolean,
    date:{
        type:Date,
        default:Date.now // this take the current date of present
    }

})

// a mongoose model is a wrapper on the mongoose schema
// mongoose model provides an interface to the database for creating, querying, updating, etc.

// collection creation

// so imp when we pass const variable its called class
// so it should be start with caps

const Details = new mongoose.model("Details", listSchema);
// details parameter is a name of collection name and its only defined in singular form

// creating document or insert
const createDocument= async () => {
    try{
        const details1= new Details ({
            name:"akshat goyal",
            email:"akshatgoyal@gmail.com",
            active:true
        })
        // first method to save data
        // details1.save() this will save the current details

        const details2= new Details ({
            name:"shagun yadav",
            email:"shagunyadav@gmail.com",
            active:false
        })

        const details3= new Details ({
            name:"amit raj",
            email:"amitraj@gmail.com",
            active:true
        })

        const result=await Details.insertMany([details1,details2,details3]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

createDocument();

const registerSchema1 = new mongoose.model("register", listSchema);
module.exports = registerSchema1;