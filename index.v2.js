const e = require("express");
const express = require("express");
const { incr, expire, ttl } = require("./models/limiter");

const app = express();

const PORT = process.env.PORT || 3040;

app.get("/api", async (req, res) => {
  try {
    // Get Ip
    const getIpUser = "128.0.0.1" || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(getIpUser);
    var numRequest = await incr(getIpUser);
    let _ttl;

    if (numRequest === 1) {
      await expire(getIpUser, 60);
      _ttl = 60;
    } else {
      _ttl = await ttl(getIpUser);
    }

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
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => {
  console.log(`The server is running 3040`);
});

console.log("Server started on: " + PORT);
