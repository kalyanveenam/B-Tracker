const express = require("express");
const app = express();
const path = require("path");
console.log(__dirname + "/dist/BTracker/index.html");
app.use(express.static(__dirname + "/dist/BTracker"));
app.listen(process.env.PORT || 8081);

app.get("", function (req, res) {
  res.sendFile(path.join(__dirname + "BTracker/dist/index.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "BTracker/dist/index.html"));
});
