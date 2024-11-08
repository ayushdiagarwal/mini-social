const express = require("express");
const dotenv = require("dotenv").config();

// make the server
const app = express();
const port = process.env.PORT_NO || 5001;

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

// use more middlewares
app.use("/api/users", require("./routes/userRoutes"));



// make the api first
