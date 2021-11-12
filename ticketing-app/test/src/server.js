const express = require("express");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.send({ message: "Hello from TEST!"});
});

app.listen(PORT, () => {
  console.log(`POSTS SERVICE listening on port: ${PORT}`);
})