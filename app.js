const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port=3000;
const app = express();

app.set('Views', path.join(__dirname,'Views'));
app.set("view engine", 'ejs');

app.use(cookieParser('secret key'));
app.use('/public', express.static('public'));

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/Registration', urlencodedParser, (req, res) => {
  login=req.body;
  console.log(login);
});
app.get('/Registration',(req, res)=>{
    res.render('Registration');
});
app.get('/Authorization',(req, res)=>{
  res.render('Authorization');
});
app.get('/',(req, res)=>{
    res.render('Authorization');
}).listen(3000, ()=>{console.log(`The server is enabled at http://localhost:${port}`)});