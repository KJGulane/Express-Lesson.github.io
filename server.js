const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connection Successfull"))
.catch((err) => {
    console.log(err);
});

// routes
const userRouter = require('./routes/users.router');
//const productsRouter = require('./routes/products.router');


const app = express();
const PORT = 8080;

// Register a middleware function that parses incoming JSON payloads/request
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

// middleware logger
app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/greeting', (req, res) => {
    const name = req.body.name;
    const greeting = `Hello Master ${name}`;
    res.send(greeting);
});

app.use('/users', require('./routes/users.router')); //http://localhost:8080/users
app.use('/products', require('./routes/products.router')); //http://localhost:8080/products

// http://localhost:3000/change-password (HTTP PUT METHOD)



app.listen(PORT, () => {
    console.log(`Server is listening to http://localhost:${PORT}`);
});