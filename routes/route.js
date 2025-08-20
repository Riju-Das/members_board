const express = require("express")
const controller = require("../controllers/controller")
const route = express.Router()
const {LoginValidation, Signupvalidation} = require("../validation")


route.get("/", controller.getHomePage)

route.get("/login", controller.getLoginPage)

route.post("/login", LoginValidation,controller.postLoginPage)

route.get("/logout",controller.logout )

route.get("/sign-up", controller.getSignUpPage)

route.get("/message/new", controller.newMessage)

route.post("/message/new", controller.postNewMessage)

route.post("/sign-up",  Signupvalidation, controller.postSignUpPage)

route.get("/message/:id/edit", controller.getEditMessage)

route.post("/message/:id/edit", controller.postEditMessage)

route.post("/message/:id/delete", controller.postDeleteMessage)

module.exports= route