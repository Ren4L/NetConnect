const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    res.render('News');
  });
  
module.exports = router;