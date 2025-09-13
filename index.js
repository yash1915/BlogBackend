// Express ko import kar rahe hai (web framework jo routes, middleware handle karta hai)
const express = require('express');

// Express aur cors ka instance bana rahe hai
const app = express();
const cors = require("cors");

// dotenv ko import karke config call kar rahe hai 
require("dotenv").config();

// PORT environment variable se le rahe hai
const PORT = process.env.PORT || 3000;

// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use(cors());

// -------------------- ROUTES IMPORT --------------------
const blogRoutes = require('./routes/blog'); // sabhi routes yaha handle honge

// -------------------- ROUTES MOUNT --------------------
app.use("/api/v1", blogRoutes);

// -------------------- DATABASE CONNECT --------------------
const dbConnect = require('./config/database');
dbConnect();

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
    console.log(`✅ App is Running at PORT ${PORT}`);
});

// -------------------- DEFAULT ROUTE --------------------
app.get('/', (req,res) => {
    res.send(`<h1>HomePage</h1>`);
});
