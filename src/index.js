const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const groceryRoute = require("./routes/groceryRoute")
const marketRoute = require("./routes/marketRoute")
const authRoute = require("./routes/authRoute")

require("./database")

const app = express()
const PORT = 5000

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: "KomarShawadika",
  resave: false,
  saveUninitialized: false,
}))

//use the groceryRoute from routes NOTE: This should be invoked before all the middleware
app.use("/api/groceries", groceryRoute)
app.use("/api/markets", marketRoute)
app.use("/api/auth", authRoute)



app.listen(PORT, () => console.log(`Running express server on port: ${PORT}`))



