// /**
//  * Created by sz8386pr on 3/13/2018.
//  */
// module.exports = {
//     EUR: 0.81,
//     JPY: 106.48,
//     USD: 1
// };

var request = require('request');

var baseURL = 'http://api.fixer.io/latest';

// I've signed up for the new fixer.io api to get the key.
// Apparently they are deprecating the current api.fixer.io by June this year
// and moved to data.fixer.io/api/
// https://github.com/fixerAPI/fixer
// I think the issue with the new one is not only you have to sign up to get the key, but the
// free plan doesn't give you ability to set the base currency but fixed to EUR
// I think the calculation/methodology would have to change to adapt to it.
var access_key = process.env.ACCESS_KEY;


function currencyRequest(callback, base, to) {

    process.nextTick(function() {   // This forces this call to wait until the current task
                                    //has finished, so it's doesn't block any other requests.
                                    //When it's done, it will use the callback to notify the caller that it's done.

        // TODO include your API key in the query parameters
        // queryParam = { 'access_key': access_key, 'symbols': to };
        queryParam = {'base': base, 'symbols': to};

        //Use request module to request currency data from Fixer API
        //Must handle result in callback. Can't return data from an asychronous function.
        request( { uri: baseURL, qs: queryParam } , function(error, fixer_response, body) {

            if (!error && fixer_response.statusCode == 200){
                console.log("FIXER SAYS \n" + JSON.stringify(body));
                var fixerJSON = JSON.parse(body);   //Convert JSON text to a JavaScript object
                callback(null, fixerJSON);
            }

            else {
                //Log error info to console and use callback to send error with message.
                console.log("Error in JSON request: " + error);
                console.log(fixer_response);
                callback(Error("Error fetching data from the fixer service"));
            }
        });
    });
}

module.exports = currencyRequest;