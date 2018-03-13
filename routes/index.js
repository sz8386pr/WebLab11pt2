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

//      todo figure out how many dollars to convert
    var dollars = req.query.dollars;
//      todo figure out the currency to convert to
    var toCurrency = req.query.to_currency;
//
//      todo figure out the exchange rate
    var converted = dollars * exchangeRates[toCurrency];
  // console.log(exchangeRates);
//
//      todo replace this with a response page with the conversion data
//     res.send(dollars + ' in ' + toCurrency + ' is ' + converted); // we have to send something in response
    res.render('results', {
      dollars: dollars,
      toCurrency: toCurrency,
      converted: converted}
    );
});

// GET about page
router.get('/about', function(req, res, next){
  res.render('about', { name: "My awesome site"});
});
module.exports = router;
