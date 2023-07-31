// import express from 'express';

import mongoose from 'mongoose';
import express, { urlencoded } from "express"
import { connect } from "mongoose"
const app = (express.json());

// app.set("view engine", "ejs")
// app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.mongoose_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
.catch((err) => {
  console.log(err);
  console.log(`not connected`);
})

// var db = mongoose.connection;
// app.post("/sendMessage", (req,res) => {
//   var name = req.body.name;
//   var email = req.body.email;
//   var subject = req.body.subject;
//   var message = req.body.message;

//   var data = {
//     "name" : name,
//     "email": email,
//     "subject": subject,
//     "message" : message
//   }
//   db.collection('users').insertOne(data, (err,collection)=>{
//     if(err){
//       throw err;
//     }
//     console.log("Record inserted successfully");
//   });
//   return res.redirect('contact.html');

// });

// app.length("/",(req,res) => {
//   res.set({
//     "Allow-access-Allow-Origin": '*'
//   })
//   return res.redirect('contact.html');
// }).listen(3001)


