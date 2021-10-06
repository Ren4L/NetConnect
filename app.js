const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
const multer = require('multer');
var FileStore = require('session-file-store')(session);
const Registration = require('./Modules/Registration');
const Authorization = require('./Modules/Authorization');
const ConfirmationMail = require('./Modules/ConfirmationMail');
const News = require('./Modules/News');
const CreateNews = require('./Modules/CreateNews');
const FullNews = require('./Modules/FullNewsTemplate');
const Setting = require('./Modules/Setting');
const port=3000;
app.set('Views',__dirname + 'Views');
app.set("view engine", 'ejs');

app.use('/public', express.static('public'));
app.use(session({
  secret:'Witcher Wild Hunt',
  key:'sid',
  resave:false,
  store: new FileStore({
    ttl:sessionTime(),
    reapInterval:sessionTime(),
  }),
  saveUninitialized:true,
}));
app.use('/Modules/Registration', Registration);
app.use('/Modules/Authorization', Authorization);
app.use('/Modules/ConfirmationMail', ConfirmationMail);
app.use('/Modules/News', News);
app.use('/Modules/CreateNews', CreateNews);
app.use('/Modules/FullNewsTemplate', FullNews);
app.use('/Modules/Setting', Setting);


app.get('/',(req, res)=>{
  req.session.destroy(()=>{
    res.render('Authorization');
  });
}).listen(port, ()=>{console.log(`The server is enabled at http://localhost:${port}`)});

function sessionTime(){
  let date = new Date();
  let time = (24 * 60 * 60) - ((date.getHours() * 60 * 60) + (date.getMinutes()* 60));
  return time
};

