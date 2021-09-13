const express = require('express');
const app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.post('/Registration', urlencodedParser, (req, res) => {
    login=req.body.login;
    exports.login=login;
});