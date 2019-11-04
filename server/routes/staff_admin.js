const express = require('express');
const router = express.Router();

router.get('/test/:userId', (req, res) =>{
    const id = req.getParam.userId;
    if(id < 5){
        res.send(`HAHAYES ${id}`);
    }
    else{
        res.send(`NO ${id}`);
    }
});

module.exports = router;