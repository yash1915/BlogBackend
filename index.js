// Express ko import kar rahe hai (web framework jo routes, middleware handle karta hai)
const express = require('express');

// Express aur cors  ka instance bana rahe hai
const app = express();
const cors = require("cors");


// dotenv ko import karke config call kar rahe hai 
// taaki .env file ke andar ke variables (jaise DB_URL, PORT) yaha use ho sake
require("dotenv").config();

// PORT environment variable se le rahe hai, agar wo define na ho to default 3000 use hoga
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [ "https://myblogapp.netlify.app"], // tumhare frontend URLs
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};


// -------------------- MIDDLEWARE --------------------

// middleware lagaya hai jo incoming request ke body me agar JSON data ho to usko parse karke req.body me daal dega
app.use(express.json());
app.use(cors());      


// routes import kar rahe hai (routes/blog.js file se)
const blog = require('./routes/blog');

// routes ko mount kar rahe hai `/api/v1` ke upar 
// iska matlab: routes/blog.js me jo bhi routes defined hai wo sab `/api/v1/...` se start honge
app.use("/api/v1", blog);


// -------------------- DATABASE CONNECT --------------------

// database connect function import kiya hai config/database.js se
const dbConnect = require('./config/database');

// dbConnect ko call kar rahe hai jisse MongoDB se connection establish hoga
dbConnect();


// -------------------- START SERVER --------------------

// server ko start kar rahe hai aur PORT pe listen kar raha hai
app.listen(PORT, () => {
    console.log("App is Running at the", PORT);
})


// -------------------- DEFAULT ROUTE --------------------

// agar koi '/' (root route) pe aata hai to simple HTML response bhejenge
app.get('/', (req,res) => {
    res.send(`<h1>HomePage</h1>`)
})
