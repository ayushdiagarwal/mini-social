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

// using middleware for posts, comments
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments/", require("./routes/commentRoutes"));


// use more middlewares
app.use("/api/users", require("./routes/userRoutes"));
