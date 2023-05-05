const express = require("express")
const groceryRoute = require("./routes/groceryRoute")

const app = express()
const PORT = 5000

//middleware
app.use(express.json())

//use the groceryRoute from routes NOTE: This should be invoked before all the middleware
app.use("/api/groceries", groceryRoute)


app.listen(PORT, () => console.log(`Running express server on port: ${PORT}`))



