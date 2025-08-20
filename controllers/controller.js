const db = require("../db/queries")
const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const passport = require("../config/passport")
const session = require("express-session")

async function getHomePage(req,res){
  
  try{
    const user = await req.user
    const messages = await db.fetchMessages()
    const users = await db.fetchUsers()
    res.render("index",{
      user:user,
      users:users,
      messages:messages
    })
  }
  catch(err){
    console.log(err)
  }
}

async function getLoginPage(req,res){
  res.render("login")
}

async function postLoginPage(req,res,next){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.render("login", {
      errors: errors.array().map(err => err.msg)
    })
  }
  passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login"
  })(req, res, next);
}

async function logout(req,res,next) {
  req.logout((err)=>{
    if(err){
      return next(err)
    }
    res.redirect("/")
  })
}

async function getSignUpPage(req,res) {
  res.render("signup")
}

async function postSignUpPage(req,res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.render("signup", {
      errors: errors.array().map(err => err.msg)
    })
  }
  try{
    const {username , password , email,fullname}= req.body
    const hashedPassword = await bcrypt.hash(password,10)
    await db.SignUpinDB(username,hashedPassword,email,fullname)
    res.redirect("/login");
  }
  catch(err){
    console.log(err)
  }
}

async function newMessage(req,res){
  try{
    const user = await req.user
    res.render("newmessage",{
      user:user
    })
  }
  catch(err){
    console.log(err)
  }

}

async function postNewMessage(req,res){
  try{
    const user_id =  req.user.id;
    const { title , message} = req.body
    await db.postNewMessage(user_id,title,message)
    res.redirect("/")
  }
  catch(err){
    console.log(err)
  }

}

async function getEditMessage(req,res){
  try{
    const user= req.user
    const msg_id = req.params.id
    const msg_user_id = await db.userIdFromMsg(msg_id)
    if(user && msg_user_id != user.id){
      res.redirect("/")
    }
    else{
      const { title, message} = await db.getMessage(msg_id)
      res.render("editmessage",{
        title:title,
        message:message,
        user:user,
        msg_id:msg_id
      })
    }
  }
  catch(err){
    console.log(err)
  }

}

async function postEditMessage(req,res){
  try{
    const msg_id = req.params.id
    const user_id = req.user.id
    const { title , message} = req.body
    await db.UpdateMessage(msg_id,user_id,title,message)
    delete req.session.EditMessageId
    res.redirect("/")
  }
  catch(err){
    console.log(err)
  }
}

async function postDeleteMessage(req,res){
  try{
    const msg_id = req.params.id;
    await db.DeleteMessage(msg_id)
    res.redirect("/");
  }
  catch(err){
    console.error("Error deleting message:", err);
    res.status(500).send("Internal Server Error");
  }

}

module.exports= {
  getHomePage,
  getLoginPage,
  postLoginPage,
  getSignUpPage,
  postSignUpPage,
  logout,
  newMessage,
  postNewMessage,
  getEditMessage,
  postEditMessage,
  postDeleteMessage
}