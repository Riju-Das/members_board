const express = require("express")
const route  = require("./routes/route")
const app = express()
const path = require("path")
require("dotenv").config()
const session = require("express-session")
const passport= require("./config/passport")


app.use(session({
  secret:"cats",
  resave: false,
  saveUninitialized:false,
  cookie:{
    maxAge:  6 * 24 * 60 * 60 * 1000
  }
}))
app.use(passport.session())

app.use(express.urlencoded({extended:true}))
app.set("views" , path.join(__dirname, "views"))
app.set("view engine" , "ejs")

const assetpath = path.join(__dirname, "public")
app.use(express.static(assetpath))

app.use("/", route)

app.listen(process.env.PORT, ()=>{
  console.log("The app is listening to port no ")
})