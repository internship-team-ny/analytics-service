let port = process.env.PORT || 3000;

const express = require('express');
const app = express();

const axios = require('axios');

app.get('/', function(req, res){
    console.log("Get request '/' ");
    res.send("Main route accessed");
});

app.get("/api/analysis", function(req, res){
    res.json( [
        {date: '6/6/1996', id:0},
        {date: '10/22/1969', id:1},
        {date: '6/19/1998', id:2},
        {date: '8/1/2000', id:3},
        {date: '8/12/1971', id:4}
    ])
});


app.get("/api/search", (req,res) => {
    axios({
        url: "http://localhost:6000/analyze",
        method: 'get',
        auth: {
            username: "moazhamza",
            password: "password"
        },
        params: {
            'tweetQ': req.query.searchQuery
        }
    })
        .then(serviceResponse => {
            res.json(serviceResponse.data);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(port, function(){
    console.log("Listening on port " + port);
});
