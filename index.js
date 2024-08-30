// const http = require('http');

import http from 'http'

import fs from 'fs'

import path from 'path';

// console.log(http);
// console.log(fs);

const server = http.createServer((req,res)=>{
    // console.log(req.url);
    if(req.url==='/'){
        res.end("this is a home rout"); 
    }else if(req.url==='/about'){
        res.end("this is about page"); 
    }
});

const port = 1000;

// const fileread = fs.readFileSync('./sample.txt','utf-8');
// fs.writeFile('index.txt',"This is the file content",()=>{
//     console.log("file creatted");
// })
// console.log(fileread)

// console.log(path);

// const extension = path.extname("sample.pdf");
// console.log(extension);

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})