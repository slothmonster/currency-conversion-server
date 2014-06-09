var express = require('express');
var router = express.Router();
var currency = require('simple-currency-conversion')({openExchangeRatesAppId: process.env.OPEN_EXCHANGE_KEY});
var convertAmount = currency.convertCurrency;
var conversionRate = currency.conversionRate;
var transactions = require('../public/javascripts/transactionData');

/* GET home page. */
router.get('/', function(req, res){
  res.redirect('/paypal/activity');
});

router.get('/paypal/activity', function(req, res) {
  res.render('activity', transactions);
});


router.get('/paypal/currencyConversion', function(req, res){
  var amount = +req.query.amount;
  var from = req.query.from;
  var to = req.query.to;
  console.log('amount ', amount);
  console.log('type of amount ', typeof amount);
  convertAmount(amount, from, to)
  .then(function(result){
    // console.log('the result ', result);
    currency.getCurrencyProfile(to)
    .then(function(profile){
      console.log('the result ', result);
      console.log('the profile ', profile);
      res.send(200, {"amount": result, "currencyCode": profile.code, "currencySymbol": profile.symbol_native});
    });
  })
  .catch(function(err){
    res.send(500, "Error converting the currency.");
  });
});

router.get('/paypal/conversionRate', function(req, res){
  var from = req.query.from;
  var to = req.query.to;
  conversionRate(from, to)
  .then(function(result){
    console.log('conversion rate ', result);
    res.send(200, {"conversionRate": result});
  })
  .catch(function(err){
    res.send(500, "Error calculating the conversion rate.");
  });
});

module.exports = router;
