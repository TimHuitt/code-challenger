const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config();
// require("./config/db.connection.js")

const { PORT } = process.env;
const challengesRouter = require('./routes/challenges')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan("dev")); 
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    // Respond with 200 status for preflight requests
    res.sendStatus(200);
    return;
  }
  next();
});


// app.use("/", apiRouter)
app.use("/challenges", challengesRouter);

app.get("/", (req, res) => {
  res.send("incorrect path");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));