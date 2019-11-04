var express = require('express')
var fs = require('fs')
const bodyParser = require('body-parser')
var app = express()


//------------------databse connection----------------//
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dataVisualization', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

var dataSchema = new mongoose.Schema({
  x_value: Number,
  y_value: Number,
  type: Number
});

var dataModel = mongoose.model('dataModal', dataSchema);
//---------------------------------------------------//


app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )  
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE,OPTIONS");
    next();
  });

//add an new entry of data
app.put("/data", function (request, response){
    var newData=request.body;
    console.log(newData);
    dataModel.create({x_value: newData.x_value, y_value: newData.y_value, type: newData.type}, function (err, small) {
      console.log(small);
      if (err) return handleError(err);
      // saved
    });
    response.sendStatus(200);
});

//delete an entry of data
app.delete("/data/:id", function (request, response){
    dataModel.remove({ _id: request.params.id }, function(err) {
      if (!err) {
          response.sendStatus(200);
      }
      else {
        return handleError(err);
      }
  });
});

//modify an entry of data with _id=?
app.post("/data", function(request, response){
  dataModel.findOneAndUpdate({_id: request.body._id}, request.body, {upsert:true}, function(err, doc){
    if (err)
        return handleError(err);
    else
        return response.sendStatus(200);
  });  
    response.sendStatus(200);
});

//get all data
app.get("/data", function(request, response){
    dataModel.find({}, function(err, dataList) {
      response.end(JSON.stringify(dataList));
    });
});

//get a single entry of data
app.get("/data/:id", function(request, response){
  dataModel.find({_id:request.params.id}, function(err, data) {
    response.end(JSON.stringify(data));
  });
});

//deal with browser pre-flight check
app.options("/data/:id", function(request, response){
  response.sendStatus(200);
});


app.listen(8081);
 
 // Console will print the message
 console.log('Server running at http://127.0.0.1:8081/');