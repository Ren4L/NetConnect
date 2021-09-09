import express from 'express'
import path from 'path';

const __dirname=path.resolve();
const port=3000;
const app = express();

app.use('/public', express.static('public'));

app.get('/',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'Views',"Authorization.html"));
}).listen(3000, ()=>{console.log(`The server is enabled at http://localhost:${port}`)});