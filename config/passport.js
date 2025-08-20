const passport= require("passport")
const LocalStrategy= require("passport-local").Strategy
const db= require("../db/queries")
const bcrypt = require("bcryptjs")

passport.use(
  new LocalStrategy(async (username,password,done)=>{
    try{
      const user= await db.findUsername(username)
      if(!user){
        return done(null, false, {message:"incorrect username"})
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch){
        return done(null, false, {message: "incorrect password"})
      }
      return done(null,user)

    }
    catch(err){
      console.log(err)
    }
  })
)

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
  try{  
    const user = await db.fetchUser(id)
    done(null,user)
  }
  catch(err){
    console.log(err)
  }
})

module.exports= passport
