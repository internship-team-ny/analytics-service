var port = process.env.PORT || 3000;

const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const db = require('./db');

passport.use(new Strategy(
  function(username, password, cb) {
      db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));



const express = require('express');
const app = express();
const twitterSearch = require('./twitter.js').search;

app.get('/analyze', passport.authenticate('basic', { session: false }),
function(req, res) {
  console.log("Welcome " + req.user.username);
  if(!req.query.tweetQ){
    console.log("No search param")
    res.writeHead(400, "Missing 'tweetQ' API parameter");
    res.end("No search param");
    return
  }
  twitterSearch(req.query.tweetQ)
  .then(function(tweets){
    res.json({
      response: req.query.tweetQuery,
      size: tweets.statuses.length,
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
