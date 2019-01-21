var request = require('request');
var POPUP = require('./popup');

request.post(
    'https://us-central1-nod-test-38899.cloudfunctions.net/sendMail',
    { json: { "key": `${POPUP.template}` } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            alert(POPUP.template)
        }
    }
);