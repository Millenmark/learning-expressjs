const { Router } = require("express")

const router = Router()

const groceryList = [
  {
    item: 'milk',
    quantity: 2,
  },
  {
    item: 'eggs',
    quantity: 4,
  }
]

router.get("/", (req, res) => {
  res.send(groceryList)
})

//Route Parameters /:item NOTE: A route parameter always prefix with a colon
router.get("/:item", (req, res) => {
  // console.log(req.params.item)
  const { item } = req.params
  const groceryItem = groceryList.find(g => g.item === item)
  res.send(groceryItem)
})

router.post("/", (req, res) => {
  console.log(req.body)
  groceryList.push(req.body)
  res.sendStatus(201)
})

module.exports = router