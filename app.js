var express = require('express');
var app = express();
var request = require('request');

// view engine to ejs 
app.set('view engine', 'ejs');

const pcloop_url = 
    "https://www.ucsdbus.com/Route/3451/Stop/3070948/Arrivals?customerID=2";

const ruperts_url = 
    "https://www.ucsdbus.com/Route/7738/Stop/2331518/Arrivals?customerID=2";


function getJSON(url) {
    return new Promise((resolve, reject) => {
        request(url, function(err, res, body) {
            resolve(JSON.parse(body));
        });
    });
}

app.get('/', function(req, res) {
    const p1 = getJSON(pcloop_url);
    const p2 = getJSON(ruperts_url);

    // Takes in array of promises, outputs array of each promise's resolves
    Promise.all([p1, p2]).then( data => {
        //console.log(data);
        console.log(data[0]['Predictions']);

        // Pass relevant data to view
        res.render('index', {
            currentTime:data[0]['PredictionTime'],
            pcloop_data: data[0]['Predictions'],
            ruperts_data: data[1]['Predictions']
        });
    });
});

app.listen(3000, function() {
    console.log('port 3000')
});