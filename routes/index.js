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

    // exchange calculation
    var converted = (exchangeRates[toCurrency] / exchangeRates[fromCurrency]  * money);

    // limit the money and the converted calculation to 2 decimal places
    money = money.toFixed(2);
    converted = converted.toFixed(2);

    // results
    res.render('results', {
      fromCurrency: fromCurrency,
      money: money,
      toCurrency: toCurrency,
      converted: converted}
    );
});

// GET about page
router.get('/about', function(req, res, next){
  res.render('about', { name: "Scott Kim", description: "A simple convertion website that converts USD to EURO or YEN"});
});
module.exports = router;
