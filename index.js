// Imports
import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Constants
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan);

// Custom middleware
let bandName = "";
function generateBandName(req, res, next) {
  bandName = req.body["street"] + req.body["pet"];
  next();
};
app.use(generateBandName);


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
