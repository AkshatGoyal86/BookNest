const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const listSchema = new mongoose.Schema({

    // this will define name of user in signup form
    name:
        {type:String,
        // unique:true,
        required:true
    },

    // this will define email of user in signup form
    email:
        {type:String,
        // unique:true,
        required:true
    },

    // this will define password of user in signup form
    password:{
        type:String,
        required:true
    },

    // this will define confirm password of user in signup form
    confirm_password:{
        type:String,
        // unique:true,
        required:true
    }
})

// bcrypt - is use to hash the password (give security to the password by making id)
listSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10); 
    next();
});

listSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
}

// exporting model
const registerSchema= new mongoose.model("signup",listSchema);
module.exports=registerSchema;