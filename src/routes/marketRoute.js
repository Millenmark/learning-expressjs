const { Router } = require("express")

const router = Router()

const superMarkets = [
  {
    _id: "1",
    store: "Whole Foods",
  },
  {
    _id: "2",
    store: "FoodTech"
  },
  {
    _id: "3",
    store: "Hamburger Milktea"
  }
]

router.get("/", (req, res) => {
  res.send(superMarkets)
})

router.get("/find/:id", (req, res) => {
  const { id } = req.params
  const market = superMarkets.find(m => m._id === id)
  res.send(market)
})

module.exports = router