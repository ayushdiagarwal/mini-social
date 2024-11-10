const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");

// make the server
const app = express();
const port = process.env.PORT_NO || 5001;

app.use(express.json()) 

// connect the database
connectDb();

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`); 
});

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id:1,
            title: 'A joke',
            content: 'This is a joke',
        },
        {
            id:2, 
            title: 'Second joke',
            content: 'This is the second joke',
        }
    ];
    res.send(jokes);
})

// using middleware for posts, comments
app.use("/api/posts", require("./routes/postRoutes"));

// use more middlewares
app.use("/api/users", require("./routes/userRoutes"));



// make the api first
