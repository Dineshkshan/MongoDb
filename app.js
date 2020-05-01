const express = require('express');
const mongo = require('mongodb')
var ObjectId = require('mongodb').ObjectID;


const app = express();
app.use(express.json());
const url = 'mongodb://localhost:27017';

mongo.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err
    var db = client.db('Database');
    app.get('/', (req, res) => {
        db.collection('Table').find().toArray(function (err, result) {
            if (err) throw err
            res.send(result);
        });
    });
    app.post('/insert', (req, res) => {
        db.collection('Table').insertOne({
            EmployeeId:req.body.EmployeeId,
            Name:req.body.Name,
            Place:req.body.Place
        }, (err) => {
            if (err) throw err
            else {
                res.send("Inserted Successfully");
            }
        });
    });
    app.put('/update',async(req,res)=>
    {
        var id=req.body.EmployeeId;
        console.log(id);    
        var placedata=req.body.Place;
        var data=await db.collection('Table').updateOne({EmployeeId:id},{$set:{Place:placedata}});
        res.status(200).send(data);
    });
    app.delete('/delete', (req, res) => {
        var id=req.body.EmployeeId;
        console.log(id);
        db.collection('Table').deleteOne({ EmployeeId:id}, (err) => {
            if (err) throw err;
            res.send("Deleted Successfully");
        });
    });
});
const port = process.env.PORT || 5000
app.listen(port, (err) => {
    if (err) {
        console.log("Application not working properly");
    }
    console.log("Application is working properly", port);
})
