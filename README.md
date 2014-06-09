currency-conversion-server
==========================

Basic server to test out my 'simple-currency-conversion' npm module.

To run the server locally 

1. clone it down to your machine
2. npm install dependencies
3. run the server with your Open Exchange App Id set as an environment variable. you can do this straight from your terminal with the following command. (just remember to substitute your own api key in for the fake string)
 
```bash
 OPEN_EXCHANGE_KEY="yourOwnString" node index.js
```

### Routes
'GET' requests to '/paypal/currencyConversion' with query string params for 'amount', 'from', and 'to' return a JSON object containing the amount in the new currency as well as the new currency code and symbol.  

Example
```javascript
GET /paypal/currencyConversion?amount=10&from=USD&to=GBP 
//returns
{
  "amount":6,
  "currencyCode":"GBP",
  "currencySymbol":"£"
}
```

'GET requests to '/paypal/conversionRate' with query string params for 'from' and 'to' return a JSON object containing the converstionRate as a JavaScript Number.  

Example
```javascript
GET /paypal/conversionRate?from=USD&to=GBP
//returns
{
  "conversionRate": 0.6
}
```

'GET' requests to '/' will be redirected to '/paypal/activity' which shows a small mockup of a few hypothetical transactions.
