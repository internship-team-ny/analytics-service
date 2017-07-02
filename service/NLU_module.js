//setting up NLU, no need to hide credentials as this code is only accessed locally
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': '0025daef-697a-405f-b544-62b39830f9a8',
    'password': 'KP6iG4kZmKti',
    'version_date': '2017-02-27'
});

//only one function in this module
module.exports = {

    analyze: function(text, callback){

        const parameters = {
            'text':text,
            'features':{
                'entities':{
                    'emotion': true,
                    'sentiment': true,
                    'limit': 10
                },
                'keywords':{
                    'emotion':true,
                    'sentiment':true,
                    'limit':10
                }
            }
        };

        natural_language_understanding.analyze(parameters, function(err, response) {
            if (err)
                console.log('error:', err);
            else
                callback(response);
        });
    }

};