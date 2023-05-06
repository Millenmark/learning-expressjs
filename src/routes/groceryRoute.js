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
  
  res.cookie("visited", true, {
    maxAge: 60000,
  })
  res.send(groceryList)
})

//Route Parameters /:item NOTE: A route parameter always prefix with a colon
router.get("/:item", (req, res) => {
  // console.log(req.params.item)
  console.log(req.cookies) //The result of this is will not become undefined if you install cookie-parser

  // console.log(req.headers.cookie) //getting the raw cookie
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