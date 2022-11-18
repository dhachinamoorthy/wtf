// Initialization
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine','ejs')

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/dbnam')
var db = mongoose.connection;
db.on('error',()=>{console.log("Error in DB connection")});
db.once('open',()=>{console.log("Connected to DB")});

// Opening Page
app.get("/",(req,res)=>{
    db.collection('demo').find({}).toArray(function(err,prob){
        res.render('index',{'userList' : prob})
    })
    // res.sendfile(__dirname + "/index.html")
})

//Insertion
app.post("/add",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;

    var data = {
        "name": name,
        "email":email
    }

    db.collection('demo').insertOne(data, (err,collection)=>{
        if(err)
            throw err;
        console.log("Record Inserted")

    })
    res.send('Successful addition')
})

//Deletion
app.post("/del",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;

    var data = {
        "name": name,
        "email":email
    }

    db.collection('demo').deleteOne(data, (err,collection)=>{
        if(err)
            throw err;
        console.log("Record Deleted");
    })
    return res.send('Deletion Success');
})

//Updation
app.post('/upd', async(req,res)=>{
    try {
        var name = req.body.name;
        var email = req.body.email;
        var newemail = req.body.newemail;

        const record = await db.collection('demo').findOne({name:name})
        if(record.email === email){
            var data = {email:email}
            var newdata = {$set:{email:newemail}}
            db.collection('demo').updateOne(data, newdata, (err,collection)=>{
                if(err)
                    throw err;
                console.log("Record Updated");
            })
            return res.send('Updation Success')
        }   
        else{
            return res.send("Email mismatch")
        }
    } catch (error) {
        
    }
    
})

app.listen(3000)