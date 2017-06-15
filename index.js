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


function formatTweetObject(element){
  return {
    created_at: element.created_at,
    id: element.id,
    test: element.text,
    retweet_count: element.retweet_count,
    user: element.user,
    source: element.source
  }
}


const express = require('express');
const app = express();
const twitterSearch = require('./twitter.js').search;


app.get('/analyze', passport.authenticate('basic', { session: false }),
function(req, res) {
  console.log(req.user.username + " has logged in");
  if(!req.query.tweetQ){
    console.log("No search param")
    res.writeHead(400, "Missing 'tweetQ' API parameter");
    res.end("No search param");
    return
  }
  twitterSearch(req.query.tweetQ)
  .then(function(tweets){
    var ID = new Date().valueOf();
    res.json({
      response: req.query.tweetQuery,
      size: tweets.serach_metadata,
      tweets: tweets.statuses.map(formatTweetObject),
      uniqueID: ID
      // INSTEAD OF RETURNING TWEETS IN RESPOSE, WILL RETURN UNIQUE ID TO CALL BACK
      // AND INVOKE REDIS MODULE TO STORE TWEETS
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
