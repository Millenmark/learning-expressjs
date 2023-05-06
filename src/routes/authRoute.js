const { Router } = require("express")
const userModel = require("../database/schemas/userSchema")

const router = Router()

router.post("/login", (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    if (req.session.user) {
      res.send(req.session.user)
    } else {
      req.session.user = {
        username
      }
      res.send(req.session)
    }
  } else res.sendStatus(401)
})

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body
  const userDB = await userModel.findOne({ $or: [{username}, {email}]})
  if (userDB) {
    res.status(400).send({message: "User already exists!"})
  } else {
    const newUser = await userModel.create({username, password, email})
    res.sendStatus(201)
  }
})

module.exports = router