const mongoose=require('mongoose')

const contact=mongoose.Schema({
    fullname:String,
    email:String,
    phone:String,
    emailsubject:String,
    query:String
})

module.exports=mongoose.model("queries",contact)