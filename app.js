const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const Registration = require('./Modules/Registration');

const port=3000;

app.set('Views', path.join(__dirname,'Views'));
app.set("view engine", 'ejs');

app.use(cookieParser('secret key'));
app.use('/public', express.static('public'));
app.use('/Modules', Registration);

app.get('/Registration',(req, res)=>{
  res.render('Registration');
});
app.get('/Authorization',(req, res)=>{
  res.render('Authorization');
});
app.get('/',(req, res)=>{
  res.render('Authorization');
}).listen(3000, ()=>{console.log(`The server is enabled at http://localhost:${port}`)});