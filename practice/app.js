// var a = 10;
// var b = 20;
// var c = 30;

// console.log(a+b+c);
// console.log("hello world!");

// var check=(a,c)=>{
//     console.log(a+c);
// }

// check(a,b);

// var http=require('http');
// http.createServer(function(req,res)
// {
//    res.write('<h1>hello from node js server</h1>');
//    res.write('hello from node js server');
//    res.write('hello from node js server');
//    res.end();
// }).listen(86)

// var sum=require('./demo');
// console.log(sum(90,23));


// var http = require('http');
// var date=require('./demo');
// http.createServer(function(req,res){
//    res.writeHead(200,{'Content-Type': 'text/html'});
//    res.write('hello from node js server');
//    res.end();
// }).listen(1234);


// var http=require('http');
// var fs=require('fs');
// http.createServer(function(req,res){
//    fs.readFile('MyTextFile.txt',function(err,data){
//       res.writeHead(200,{'Content-Type': 'text/html'});
//       res.write(data);

//       return res.end();
//    })
// }).listen(2005);


// var fs = require('fs');
// fs.appendFile('CreateNewFile.txt','hello content!', function(err){
//    if(err) throw err;
//    console.log('saved!');
// });


// var fs = require('fs');
// fs.open('new.txt', 'w', function(err, file){
//    if(err) throw err;
//    console.log('saved again!');
// });


// var fs = require('fs');
// fs.writeFile('new.txt', 'hey!', function(err){
//    if(err) throw err;
//    console.log('saved!');
// });


// update files


// var fs = require('fs');
// fs.appendFile('new.txt', 'this is my text', function (err){
//    if (err) throw err;
//    console.log('updated!');
// });


// var fs = require('fs');
// fs.writeFile('new.txt', 'this is my text..', function (err){
//    if (err) throw err;
//    console.log('replaced!');
// });


// delete file

// var fs = require('fs');
// fs.unlink('new.txt', function (err){
//    if (err) throw err;
//    console.log('file deleted!');
// });


// rename files

// var fs = require('fs');
// fs.rename('renamefile.txt', 'rename.html', function (err){
//    if (err) throw err;
//    console.log('file renamed!');
// });
