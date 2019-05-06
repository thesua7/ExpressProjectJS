        var express = require('express');
        var bodyParser = require('body-parser');
        var path = require('path');


        var app = express();
           
        /*
        var logger = function(req,res,next){
            console.log('Logging..');
            next();
        }

        app.use(logger);
        */ //This is how middleware works

        //Bodyparser middleware
         app.use(bodyParser.json());
         app.use(bodyParser.urlencoded({extended:false}));

         //
         
         /* taskkill /f /im node*  For killing all the node tasks(run on cmd)*/
         
         //View Engine
         app.set('view engine','ejs');
         app.set('views',path.join(__dirname,'views'));

         // Set static path
         app.use(express.static(path.join(__dirname,'public')));
         


        app.get('/',function(req,res){
            res.render('index');
        })


        app.listen(3000,function(){
            console.log('Server started');
        })





        
        
        //old
        // app.use(bodyParser.urlencoded({extended: true}));

        // const MongoClient = require('mongodb').MongoClient;

        //  var db= MongoClient.connect('mongodb+srv://thesua7:<password>@testone-p7vmw.mongodb.net/test?retryWrites=true', (err, database) => {
        //         if (err) return console.log(err)
        //         db = client.db('star-wars-quotes') // whatever your database name is
        //         app.listen(3000, () => {
        //           console.log('listening on 3000')
        //         })
        //         // ... start the server
        //  })


        

       

        // app.listen(3000,function(){
        //     console.log('Server started on port 3000.. ');
        // })

        // app.get('/',function(req,res){
        //     res.sendFile(__dirname+'/index.html'); 
            
        //     // app.get('path',function(request,response){}) --Structure of GET
        //     // "$ ./node_modules/.bin/nodemon server.js" to run nodemon 
        //     //to trigger nodemon "npm run dev"


        // })

        // //creating a post
        // app.post('/quotes', (req, res) => {
        //     console.log(req.body);
        //   })