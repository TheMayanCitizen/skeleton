const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");
const db = require("./utils/database");
//const initModels = require("./models/initModels")
const app = express();

const PORT = process.env.PORT || 5000;

//Validamos conexion
db.authenticate()
  .then(() => {
    console.log("Database Authenticated");
  })
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Database Authenticated"))
  .catch((err) => console.log(err));

//initModels()

//middelwares
app.use(express.json());
app.use(cors());

const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} | ${req.path}`);
  req.message = "Hello";
  if (req.method !== "DELETE") {
    next();
    return;
  }
  res.status(400).json({ message: "Ey, no hagas delete" });
};

app.use(loggerMiddleware); //Asi se hace global
app.get("/", (req, res) => {
  //asi se usa de manera local solo para esta ruta
  res.status(200).json({
    message: "Server ok :D",
    myMessage: req.message,
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});

/* 
const express = require("express")
const cors = require('cors')
require('dotenv').config()

const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')

const db = require('./utils/database')
const app = express()

const PORT = process.env.PORT || 3000

//? Validar la conexión 

db.authenticate()
    .then(() => console.log('Database Authenticated!'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Database Synced!'))
    .catch(err => console.log(err))
    

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        message: 'Server OK', 
        myMessage: process.env.MESSAGE, 
        myPort: process.env.PORT
    })
}) 

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})
*/
