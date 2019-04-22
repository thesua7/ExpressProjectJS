        var express = require('express');
        var bodyParser = require('body-parser');
        var path = require('path');


        var app = express();

        app.listen(3000,function(){
            console.log('Server started on port 3000.. ');
        })

        app.get('/',function(req,res){
            res.sendFile(__dirname+'/index.html'); 
            
            // app.get('path',function(request,response){}) --Structure of GET
            // "$ ./node_modules/.bin/nodemon server.js" to run nodemon 
            //to trigger nodemon "npm run dev"


        })