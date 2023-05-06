const { Router } = require("express")
const { hashPassword, comparePassword } = require("../utils/helpers")
const userModel = require("../database/schemas/userSchema")

const router = Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  // if (username && password) {
  //   if (req.session.user) {
  //     res.send(req.session.user)
  //   } else {
  //     req.session.user = {
  //       username
  //     }
  //     res.send(req.session)
  //   }
  // } else res.sendStatus(401)
  if (!email || !password) return res.sendStatus(400)
  const userDB = await userModel.findOne({ email })
  if (!userDB) return res.sendStatus(401)
  const isValid = comparePassword(password, userDB.password)
  if (isValid) {
    console.log("Authenticated Successfully!", userDB)
    req.session.user = userDB
    return res.sendStatus(200)
  } else {
    console.log("Failed to Authenticate! :(")
    return res.sendStatus(401)
  }
})

router.post("/register", async (req, res) => {
  const { email } = req.body
  const userDB = await userModel.findOne({email})
  if (userDB) {
    res.status(400).send({message: "User already exists!"})
  } else {
    const password = hashPassword(req.body.password)
    console.log(password)
    await userModel.create({password, email})
    res.sendStatus(201)
  }
})

module.exports = router