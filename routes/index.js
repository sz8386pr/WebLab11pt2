var express = require('express');
var router = express.Router();
var exchangeRates = require('../model/currencyDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET convert page
router.get('/convert', function(req, res, next){
  var query = req.query; // get the URL query string as an object

    // convert from
    var fromCurrency = req.query.from_currency;
    // money amount. parseFloat to convert str into float
    var money = parseFloat(req.query.money);
    // convert to
    var toCurrency = req.query.to_currency;

    // var converted = (exchangeRates[toCurrency] / exchangeRates[fromCurrency]  * money);
    exchangeRates(function(error, data){

        // if there is an error, render the error page
        if (error) {
            return res.render('error', {error: error.message})
        }

        // if user entered toCurrency the same as fromCurrency, set rate to 1
        if (toCurrency === fromCurrency){
            var rate = 1;
        }
        // Otherwise get the rates
        else {
            rate = data['rates'][toCurrency];
        }

        // exchange calculation
        var converted = money * rate;

        // If no error, render the results
        return res.render('results', {
            fromCurrency: fromCurrency,
            money: money,
            toCurrency: toCurrency,
            converted: converted}
        );
    }, fromCurrency, toCurrency)
});

// GET about page
router.get('/about', function(req, res, next){
  res.render('about', { name: "Scott Kim", description: "A simple convertion website that converts from and to USD, EURO or YEN"});
});

module.exports = router;
