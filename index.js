const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS middleware
app.use(cors());

// Users data
const users = [
  { id: 1, name: "Shabana", email: "shabana@gmail.com" },
  { id: 2, name: "Shanoor", email: "Shanoor@gmail.com" },
  { id: 3, name: "Sabila", email: "Sabila@gmail.com" },
];

// Root route
app.get("/", (req, res) => {
  res.send("Simple Node Server Running");
});

// Users route
app.get("/users", (req, res) => {
  try {
    console.log("GET /users route called"); // Debugging log
    res.send(users);
  } catch (error) {
    console.error("Error in /users route:", error); // Log error
    res.status(500).send({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Simple node server running on port ${port}`);
});
