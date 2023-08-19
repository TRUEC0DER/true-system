## TRUESystem - Server

**About:**
Server part of TRUESystem written on NestJS

**Configuration:**
The config file is located in /src/app.config.json
```javascript
{
  // Payment system settings
  "anypay": {
    "secret_key": "1234567890", // Merchant secret key
    "merchant_id": 1234, // Merchant id
    "url": "https://anypay.io/merchant", // Merchant url
    "allow_ips": [ // Allow ips to payment verify route
      "185.162.128.38", 
      "185.162.128.39",
      "185.162.128.88"
    ],
    "success_url": "https://example.com/success", // Success payment url
    "fail_url": "https://example.com/fail" // Failed payment url
  },
  // Database settings
  "database": {
    "mongodb": {
      "url": "mongodb+srv://admin:password@ip/database?retryWrites=true&w=majority" // MongoDB database url
    }
  },
  // Products settings
  "products": [
    {
      "id": 0, // Product id
      "name": "Pass (100 days)", // Product name
      "info": "Season pass (100 days)", // Product description
      "price": 100, // Product price
      "servers": [
        {
          "ip": "server-ip.com", // Rcon IP
          "port": 25575, // Rcon port
          "password": "server-password", // Rcon password
          "commands": ["whitelist add %nickname%", "say %nickname% purchased a pass"] // Сommands to be executed after the purchase of the product
        }
      ]
    }
  ]
}
```

**Main commands:**

`npm build`

`npm start`

`npm start:dev`

`npm start:prod`
