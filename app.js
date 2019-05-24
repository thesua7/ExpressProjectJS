
        var express = require('express');
        var bodyParser = require('body-parser');
        var path = require('path');
        var expressValidator = require('express-validator');
        var mongojs = require('mongojs')
        var db = mongojs('customerapp', ['users'])
        var passwordHash = require('password-hash');
        var session = require('express-session')

        var ObjectId = mongojs.ObjectID;

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

         //session 
         app.use(session({
            secret: 'sua7',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60 * 1000 * 30
             }
          }))

         //Global variable
         app.use(function(req,res,next){

            res.locals.errors = null;
            next();

         });


         app.use(expressValidator({
            errorFormatter: function(param, msg, value) {
                var namespace = param.split('.')
                , root    = namespace.shift()
                , formParam = root;
          
              while(namespace.length) {
                formParam += '[' + namespace.shift() + ']';
              }
              return {
                param : formParam,
                msg   : msg,
                value : value
              };
            }
          }));
         
      

        app.get('/',function(req,res){
 
          // find everything
            db.users.find(function (err, docs) {
                
                res.render('index',{
                    title: 'Customers', //passing variable to view
                    users: docs //passing an array variable
                });
            })

            var title = 'Customers';
     
        })

        app.post('/users/add',function(req,res){

            req.checkBody('first_name','First Name is Required').notEmpty();
            req.checkBody('last_name','Last Name is Required').notEmpty();
            req.checkBody('email','Email is Required').notEmpty();
            req.checkBody('password','Password is Required').notEmpty();
            
            var errors = req.validationErrors();

            if(errors){
                
                    res.render('index',{
                    title: 'Customers', //passing variable to view
                    users: users, //passing an array variable
                    errors: errors
                });
            }
            
            else {

                var hashedPassword = passwordHash.generate(req.body.password);
                

                var newUser = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password:hashedPassword
                }

                db.users.insert(newUser,function(err,result){
                    if(err){
                        console.log(err);
                    }

                    res.redirect('/');

                });
            }

       
            
        });
        

        app.post('/users/login',function(req,res){

            var cheak =0;
            var umail=null

            db.users.find(function(err,docs){
                docs.forEach(function(u){

                    if(passwordHash.verify(req.body.password, u.password)){ //Password verifying using hashing 
                        //console.log(u.email);
                        cheak = 1;
                        umail = u.email;
                      

                    }


                    // if(u.email==req.body.email){
                    //    console.log(u.email);
    
                        
                    // }
                });

                if(cheak==1){
                    req.session.email = umail;
                    console.log(umail);
                    res.redirect('/home');
                }
                else{
                    console.log("Wrong Password");
                }
            })
 
        



        })

        app.get('/home',function(req,res){
            var s = req.session.email;

            res.render('home',{
                  email:s
            });

        });

        app.delete('/users/delete/:id',function(req,res){
            // console.log(req.params.id);
            db.users.remove({_id: ObjectId(req.params.id)},function(err,result){
                if(err){
                    console.log(err);
                }
                res.redirect('/');
            });
        });


        app.listen(3000,function(){
            console.log('Server started');
        })








          

        // array variable
        // var users = [
        //     {
        //         id: 1,
        //         first_name: 'Nashita',
        //         last_name: 'Behroz',
        //         email: 'nb@gmail.com',
        //     },
        //     {
        //         id: 2,
        //         first_name: 'Nanzifa',
        //         last_name: 'Nuzhat',
        //         email: 'nn@gmail.com',
        //     },
        //     {
        //         id: 3,
        //         first_name: 'Sani',
        //         last_name: 'Ahamed',
        //         email: 'sa@gmail.com',
        //     }
        // ]


        
        
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