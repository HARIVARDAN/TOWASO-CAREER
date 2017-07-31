

'use strict';
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


const express = require('express');



const app = express();

const exphbs = require('express-handlebars');



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




const BD =  {
  user :
     {name : 'Business Development' , posturl : 'bd' ,
    question :'Which plays a great role in a Startup, Business or Marketing?' ,
    department : '<a href="/bd"><h1> Business Development </h1></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>'
      }        
   }

function getData(req){

     var data = {

   name  :  req.body.name,
   email :  req.body.email,
   mobile : req.body.mobile,
   institution : req.body.institution,
   location : req.body.location,
   discipline : req.body.discipline,
   resumeURL : req.body.resumeURL,
   FitforThis : req.body.answer1,
   WhyJoin : req.body.answer2,
  };

  return data;
}
 
var bs = JSON.stringify(BD);

app.post('/bd' , (req , res) => {

 BD.user.personName = req.body.name ;

  var data = getData(req);

  data.better = req.body.answer3;

admin.database().ref(`/BD/`).push(data).then(function(){

  res.render('index', {
    index : {
      personName : req.body.name 
    }

  });
 
   },function(error){
   
     res.render('index', {
    index : {
      error : error
    }
   });

 });

});

app.post('/rd' , (req , res) => {

 
   var data = getData(req);

    admin.database().ref(`/RD/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });

});

app.post('/marketing' , (req , res) => {

 
   var data = getData(req);
  
   data.better = request.body.answer3;
   data.ideaAboutMarketing = req.body.answer4;

    admin.database().ref(`/MARKETING/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });
    
});


app.post('/embedded' , (req , res) => {

 
   var data = getData(req);

   data.works = req.body.answer3;

    admin.database().ref(`/EMBEDDED/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });
    
});

app.post('/web' , (req , res) => {
  

 
   var data = getData(req);

   data.works = req.body.answer3;

   data.technologies = req.body.answer4;

    admin.database().ref(`/WEB/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });
    
});

app.post('/app' , (req , res) => {
  
 
   var data = getData(req);

   data.works = req.body.answer3;

   data.technologies = req.body.answer4;

    admin.database().ref(`/APP/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });
    
});

app.get('/bd', (req, res) => {

   console.log('url :' + req.url);
    console.log(BD);
    res.render('user',BD );
   
    });
   

 app.get('/', (req, res) => {

   console.log('url :' + req.url);
   res.render('index', { index : {  personName : null}
  
   }); 
 });




app.get('/marketing', (req, res) => {

	res.render('user', {
    user: { name : 'Marketing Department', posturl : 'marketing',
    question :'Which plays a great role in a Startup, Business or Marketing?' ,
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h1>Marketing </h1> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>' ,
     extraquestion : 
            '<div class="form-row">' +
               '<label>' +
                    '<span> Do you have an idea to do marketing for a startup ?</span>'+
                    '<textarea name="answer4" id="answer4" ></textarea>' +
                '</label>' +
           '</div>' 
       }
  });


});

app.get('/rd', (req, res) => {

   console.log('url :' + req.url);
   res.render('user', {
    user: { name : 'Research and Development', posturl : 'rd',
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h1>Reasearch and Development </h1></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>',
    question :'Which one do you prefer, Door to Door or Bio Gas or VermiCompost or Water Treatment?'
}
  });

 
});

app.get('/embedded', (req, res) => {

   console.log('url :' + req.url);
   res.render('user', {
    user: { name : 'Embedded System', posturl : 'embedded',
    question :'Have you ever worked on MicroControllers?',
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h1>Embedded System</h1></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>'
}
  });

 
});

app.get('/web', (req, res) => {

   console.log('url :' + req.url);
   res.render('user', {
    user: { name : 'Web Development', posturl : 'web',
    question :'Have you done any websites? If Yes,provide their link and technologies used.' ,
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h1>Web Development </h1></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>',
     extraquestion : 
            '<div class="form-row">' +
               '<label>' +
                    '<span> Technologies & Languages you know </span>'+
                    '<textarea name="answer4" id="answer4"></textarea>' +
                '</label>' +
           '</div>' 
       }

  });

 
});

app.get('/app', (req, res) => {

   console.log('url :' + req.url);
   res.render('user', {
    user: { name : 'App Development', posturl : 'app',
    question :'Have you done any app before?',
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h1>App Develpoment </h1></a>',
    extraquestion : 
            '<div class="form-row">' +
               '<label>' +
                    '<span> Technologies & Languages you know </span>'+
                    '<textarea  name="answer4" id="answer4"></textarea>' +
                '</label>' +
           '</div>' 
       }

  });

 
});

exports.app = functions.https.onRequest(app);



