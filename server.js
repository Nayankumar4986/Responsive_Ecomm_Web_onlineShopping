import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import stripe from 'stripe';



// import("./public/conn.js");

// Load variables
dotenv.config();

// Create Express app
const app = express();

// Serve static files from the "MyEcomWeb" directory
app.use("/images", express.static("images"));

app.use(express.static("public"));

// Parse JSON requests
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

//sucesss 
app.get("/success", (req, res) => {
  res.sendFile('success.html', {root: 'public'});
});

//cancel 
app.get("/cancel", (req, res) => {
  res.sendFile('cancel.html', {root: 'public'});
});

//stripes
let stripeGateway = stripe(process.env.stripe_api);
let DOMAIN = process.env.DOMAIN;

app.post('/stripe-checkout', async(req,res) =>{
   const lineItems = req.body.items.map((item) => {
    const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
      console.log('item-price:',item.price);
      console.log('unitAmount:',unitAmount);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.productImg]
            // images: [`${DOMAIN}/${item.productImg[0]}`],
            // images: [`${process.env.SERVER_URL}/public${item.productImg[0]}`],
            
          },
          unit_amount: unitAmount,
        },
        // quantity: item.quantity,
        quantity: Math.max(1, parseInt(item.quantity)),
     
      };

     });
     console.log('lineItems:',lineItems);
    //  console.log(images);
     //create checkout session
     const session = await stripeGateway.checkout.sessions.create({
        payment_method_types:["card"],
        mode: "payment",
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
        line_items: lineItems,
        //asking address in stripe chcekout page
        billing_address_collection: 'required',
        });
        res.json(session.url);
});

// Start the server
// const port = process.env.PORT || 3001;
app.listen(3001, () => {
  console.log("listening on port 3001;");
});






