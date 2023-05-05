const express = require("express")

const app = express()
const PORT = 5000

//middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`)
  next()
})


app.listen(PORT, () => console.log(`Running express server on port: ${PORT}`))

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

app.get("/groceries", (req, res) => {
  res.send(groceryList)
})

app.post("/groceries", (req, res) => {
  console.log(req.body)
  res.sendStatus(201)
})