// Cesar Ramirez
//113515245

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []



// Index to keep track of iterations through tweet search
var index = 0;

//load the input file


fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweetinfo: tweetinfo});

});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({tweetinfo: tweetinfo});

});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  res.send({index: index});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  var tweets = req.body.tweet;

  const parsedStrings = tweets.split(';');
  var id = parsedStrings[0];
  var textsub = parsedStrings[1];
  var idint = parseInt(id, 10);

  var currentdate = new Date();
  var datetime = (currentdate.getMonth()+1)  + "/"
      + currentdate.getDate() + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

  tweetinfo.push({
    "created_at": datetime,
    "id": idint,
    "id_str": id,
    "text": textsub,

  });
  res.send("Tweet created");

});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
  var id = res.body.id;
  console.log(id);
  for(var i = 0; i < tweetinfo.length(); i++) {
    if (tweetinfo[i].id == id)
    {
      index = i;
    }
  }
  res.send( {index: index});
});

//Update
app.post('/tweets', function(req, res) {
  //TODO: update tweets
  var id = req.body.tweet;
  var found = false;
  const parsedStrings = id.split(";");
  var name = parsedStrings[0];
  var newName = parsedStrings[1];

  tweetinfo.forEach(function (tweetinfo) {
    if (!found&&tweetinfo.user.name == name)
    {
      tweetinfo.user.screen_name = newName;
    }
  });

  res.send("Updated successfully");
});

//Delete 
app.delete('/tweetinfo', function(req, res) {
  //TODO: delete a tweet
  var id = req.body.id;
  var found = false;
  var index = 0;
  tweetinfo.forEach(function (tweetinfo)
  {
    if (tweetinfo.id_str == id)
    {
      tweetinfo.splice(index, 1);
    }
    ++index;
  });
  res.send("Deleted successfully");
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});