const { Router } = require("express")

const router = Router()

const superMarkets = [
  {
    _id: "1",
    store: "Whole Foods",
    miles: 0.6
  },
  {
    _id: "2",
    store: "FoodTech",
    miles: 2.5
  },
  {
    _id: "3",
    store: "Hamburger Milktea",
    miles: 4.8
  },
  {
    _id: "4",
    store: "Hamburger Milktea",
    miles: 8.8
  }
]

router.use((req, res, next) => {
  if (req.session.user) next()
  else res.sendStatus(401)
})

router.get("/", (req, res) => {
  // console.log(req.query)
  const { miles } = req.query //the value of miles is a string so you need to convert it into number
  const parsedMiles = parseInt(miles) //No need to use if(miles) because we parsed it into a number and it will become undefined if the miles is not existing or not a truthy value
  if (!isNaN(parsedMiles)) {
    const filteredStores = superMarkets.filter(s => s.miles <= parsedMiles)
    res.send(filteredStores)
  } else res.send(superMarkets)
})

router.get("/find/:id", (req, res) => {
  const { id } = req.params
  const market = superMarkets.find(m => m._id === id)
  res.send(market)
})

module.exports = router