const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Allows Node to serve up React app
app.use(express.static(path.resolve(__dirname, '../front_end/momentus/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server! API test successful" });
});

// Any other get requests will 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../front_end/momentus/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});