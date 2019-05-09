        var express = require('express');
        var bodyParser = require('body-parser');
        var path = require('path');
        var expressValidator = require('express-validator');


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
         
        var users = [
            {
                id: 1,
                first_name: 'Nashita',
                last_name: 'Behroz',
                email: 'nb@gmail.com',
            },
            {
                id: 2,
                first_name: 'Nanzifa',
                last_name: 'Nuzhat',
                email: 'nn@gmail.com',
            },
            {
                id: 3,
                first_name: 'Sani',
                last_name: 'Ahamed',
                email: 'sa@gmail.com',
            }
        ]

        app.get('/',function(req,res){
            var title = 'Customers';
            res.render('index',{
                title: 'Customers', //passing variable to view
                users: users //passing an array variable
            });
        })

        app.post('/users/add',function(req,res){
            var newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            }
            console.log(newUser);
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