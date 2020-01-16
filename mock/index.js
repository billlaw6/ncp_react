const express = require("express");
const bodyParser = require("body-parser");

const { Router } = express;

const app = express();
const router = new Router();

router.post("/upload", (req, res) => {
  console.log("req body", req.body);
});

app.use(bodyParser.json());
app.use(router);

app.listen(3002, "0.0.0.0", () => {
  console.log("service is running http://localhost:3002");
});
