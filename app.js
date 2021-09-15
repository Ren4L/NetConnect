const express = require('express');
const app = express();
const path = require('path');
const Registration = require('./Modules/Registration');
const Authorization = require('./Modules/Authorization');

const port=3000;


app.set('Views', path.join(__dirname,'Views'));
app.set("view engine", 'ejs');

app.use('/public', express.static('public'));
app.use('/Modules/Registration', Registration);
app.use('/Modules/Authorization', Authorization);


app.get('/',(req, res)=>{
  res.render('Authorization');
}).listen(port, ()=>{console.log(`The server is enabled at http://localhost:${port}`)});
