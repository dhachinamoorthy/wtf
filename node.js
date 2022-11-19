const express = require('express');
var data = require("../data");
var router = express.Router();
var app = express();

router.get('/',(req,res)=>{
    res.sendFile(__dirname + '/A.html');
})
router.post('/insert',encoder,function(req,res)
{
    var Fname = req.body.Fname;
    var Fquality = req.body.Fquality;
    var Fprice = req.body.Fprice;
    var sql = "INSERT INTO FOOD (Fname,Fquality,Price) VALUES ('"+Fname+"','"+Fquality+"','"+Fprice+"')";
    connection.query(sql,function(err,result)
    {
        if(err)
        console.log(err);
        else
            console.log("1 Record is Excecuted")
            res.send("successful")
    })
})

