const express = require("express");

const app = express();

const PORT = process.env.PORT || 3040;
var numRequest = 0;

app.get("/api", (req, res) => {
  ++numRequest;
  if (numRequest > 5) {
    return res.status(503).json({
      status: "error",
      message: "Server is busy!",
      numRequest,
    });
  }

  res.json({
    status: "success",
    element: [
      { id: 1, name: "java" },
      { id: 2, name: "node" },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`The server is running 3040`);
});

console.log("Server started on: " + PORT);
