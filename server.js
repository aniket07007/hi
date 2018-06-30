var express = require('express');
var app = express();
var hbs = require('hbs')
var fs = require('fs');
var port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getFullYear', ()=>{
      return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
 return text.toUpperCase();
});

// app.use((req, res, next)=>{
//      res.render('maintanance');
// })

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  fs.appendFile('server.log', log+'\n');
  console.log(log);
  next();
})

app.get('/', (req, res)=> {
 res.render('home.hbs', {
   pageTitle: 'Welcome'
 });

// res.send({
//     name: 'andrewMead',
//     hobbies: ['coding', 'teaching']
// })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs' , {
      pageTitle : 'About Us'
     
    });
});

app.get('/badurl', (req, res)=>{
  res.send({
        error: "This page can not be opened"
  });
});
app.listen(port, ()=>{
  console.log(`server is started on port ${port}`);
});