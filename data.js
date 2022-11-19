const mysql = require("mysql");
const express = require('express');
var fs = require('fs');
var app = express();
var encoder = require('body-parser').urlencoded();
var connection = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        port:"8080",
        database:"MyDB1"
    }
);
connection.connect(function(err)
{
    if(err)
    console.log("Error");
    console.log("Connected to Server");
});
app.use(express.static('/Users/dhachina/Downloads/WEB'))
app.get('/',function(req,res)
{
    res.sendFile(__dirname + '/A.html');
})
app.post('/insert',encoder,function(req,res)
{
    var Fname = req.body.Fname;
    var Fquantity = req.body.Fquality;
    var Fprice = req.body.Fprice;
    var sql = "INSERT INTO FOOD (Fname,Fquantity,FPrice) VALUES ('"+Fname+"','"+Fquantity+"','"+Fprice+"')";
    connection.query(sql,function(err,result)
    {
        if(err)
        console.log(err);
        else
            console.log("1 Record is Inserted")
            res.send('successful')
        })
})
app.post('/delete',encoder,function(req,res)
{
    var Fname = req.body.Fname;
    var Fquantity = req.body.Fquality;
    var Fprice = req.body.Fprice;
    var sql = "DELETE FROM FOOD WHERE Fname = '"+Fname+"'";
    connection.query(sql,function(err,result)
    {
        if(err)
        console.log(err);
        else
            console.log("1 Record is Deleted")
            res.send('successful')
        })
})
app.post('/update',encoder,function(req,res)
{
    var Fname = req.body.Fname;
    var Fquantity = req.body.Fquality;
    var Fprice = req.body.Fprice;
    var sql = "UPDATE FOOD SET Fquality = '"+Fquantity+"', Price = '"+Fprice+"' WHERE Fname = '"+Fname+"'";
    connection.query(sql,function(err,result)
    {
        if(err)
        console.log(err);
        else
        {
            console.log("1 Record is Updated")
            res.send('successful')
        }
        })
})

app.listen(4500);