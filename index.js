const express = require('express');
const app = express();
const twitterSearch = require('./twitter.js').search;

var port = process.env.PORT || 3000;

app.get('/analyze', function(req, res){
  if(!req.query.tweetQ){
    console.log("No search param")
    res.writeHead(400, "Missing 'tweetQ' API parameter");
    res.end("No search param");
    return
  }
  twitterSearch(req.query.tweetQ)
  .then(function(tweets){
    res.json({
      response: "Asking for: " + req.query.tweetQ,
      size: tweets.statuses.length
      tweetTexts: tweets.statuses.map(function(element){
        return {
          text: element.text,
          username: element.user.screen_name
      }})
    })
  })
  .catch(function(err){
    console.log(err);
    res.statusCode = err[0].code;
    res.statusMessage = err[0].message;
    res.end();
  })

});
app.get('/results', function(req, res){

});

app.listen(port, function () {
  console.log('Listening on port ' + port);
})
