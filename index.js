const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb"); // Import MongoDB client

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON parsing for POST requests

// MongoDB connection
const uri = "mongodb+srv://test:Sy1jVRk6xzBeJsq3@cluster0.disah5t.mongodb.net/";
//   "mongodb+srv://test:Sy1jVRk6xzBeJsq3@cluster0.mongodb.net/TestDB?retryWrites=true&w=majority"; // Replace with your MongoDB URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db, usersCollection;

// Connect to the database
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("TestDB"); // Replace <dbname> with your database name
    usersCollection = db.collection("users"); // Replace 'users' with your collection name
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("Simple Node Server Running");
});

// GET users from the database
app.get("/users", async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray(); // Fetch all users
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// POST new user to the database
app.post("/users", async (req, res) => {
  try {
    const newUser = req.body; // Get user data from request body
    const result = await usersCollection.insertOne(newUser); // Insert user into database
    res.status(201).send(result.ops[0]); // Respond with the created user
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send({ error: "Bad request" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Simple node server running on port ${port}`);
});

module.exports = app;
