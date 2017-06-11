require('dotenv').config();
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


function search(term, callbackFunction){
  console.log()
  var params = {
    q : term,
    result_type: "recent",
    count: 100,
    lang: "en"
  };

  if (callbackFunction){
    client.get('search/tweets', params, function(err, tweets,response){
      callbackFunction(err,tweets);
    });
    return;
  }
  let promise = new Promise((succeeded, failed) => {
    client.get('/search/tweets', params)
    .then((tweets) => {
      succeeded(tweets);
    })
    .catch((err) => {
        failed(err);
    });
  });
  return promise;
}

module.exports = {
  search : search,
}
