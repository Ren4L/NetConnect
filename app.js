const express = require('express');
const app = express();
const session = require('express-session');

const multer = require('multer');
var FileStore = require('session-file-store')(session);
const Registration = require('./modules/Registration');
const Authorization = require('./modules/Authorization');
const ConfirmationMail = require('./modules/ConfirmationMail');
const News = require('./modules/News');
const CreateNews = require('./modules/CreateNews');
const FullNews = require('./modules/FullNews');
const Setting = require('./modules/Setting');
const ForgotPassword = require('./modules/ForgotPassword');
const ChangePassword = require('./modules/ChangePassword');
const Friends = require('./modules/Friends');
const PersonalPage = require('./modules/PersonalPage');
const Photos = require('./modules/Photos');
const Videos = require('./modules/Videos');
const Home = require('./modules/Home');
const Posts = require('./modules/Posts');
const port = process.env.PORT || 3000;
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

app.use('/modules/Registration', Registration);
app.use('/modules/Authorization', Authorization);
app.use('/modules/ConfirmationMail', ConfirmationMail);
app.use('/modules/News', News);
app.use('/modules/CreateNews', CreateNews);
app.use('/modules/FullNews', FullNews);
app.use('/modules/Setting', Setting);
app.use('/modules/ForgotPassword', ForgotPassword);
app.use('/modules/ChangePassword', ChangePassword);
app.use('/modules/Friends', Friends);
app.use('/modules/PersonalPage', PersonalPage);
app.use('/modules/Photos', Photos);
app.use('/modules/Videos', Videos);
app.use('/modules/Home', Home);
app.use('/modules/Posts', Posts);


app.get('/',(req, res)=>{
  req.session.destroy(()=>{
    res.render('Authorization');
  });
}).listen(port, ()=>{console.log(`The server is enabled at http://localhost:${port}`)});

app.get('*',(req, res)=>{
  res.render('404NotFound');
});

function sessionTime(){
  let date = new Date();
  let time = (24 * 60 * 60) - ((date.getHours() * 60 * 60) + (date.getMinutes()* 60));
  return time
};

