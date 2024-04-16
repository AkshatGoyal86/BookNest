const mongoose=require('mongoose');

var conn=mongoose.connect("mongodb+srv://akshatgoyal:Akshat862005@cluster0.zl02xac.mongodb.net/testing?retryWrites=true&w=majority&appName=Cluster0",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>console.log("connection successfully.."))
.catch((err)=>console.log(err))

module.exports = conn;