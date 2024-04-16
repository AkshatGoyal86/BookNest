const express=require('express');
const app=express();

// app.get('/',function(req,res)
// {
//     res.send("login page 2055");
// })
// app.get('/aboutus', function(req,res)
// {
//     res.send("about us page 3055");
// })
// app.listen(7725);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const router= express.Router();
router.get('/',function(req,res)
{
    res.sendFile(__dirname+"/delete1.txt");
})
router.get('/aboutus',function(req,res)
{
    res.sendFile(__dirname+"/delete2.txt");
})
app.use('/',router);
app.listen(9200)
