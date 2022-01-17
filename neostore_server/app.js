const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 8899;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// db connection
const db = "mongodb://localhost:27017/neostore";
const connect_db = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB Connected.");
    } catch (err) { console.log(err.message); }
}; connect_db();

//Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const tempRoute = require('./routes/temp');
// 
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/temp', tempRoute);

// Server Index Page.
app.get('/', (req, res) => { res.status(200).json({ message: "Server Running" }) });

// Host Server
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening at http://localhost:${PORT}`);
});