const express = require("express");
const cors = require("cors");
const PORT = 9300;
const app = express();
const PostService = require("../common/services/post-service");
const { QUERY_REDUCER } = require("../common/reducers/query-reducer");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const Posts = new PostService();

app.get("/posts", (req, res) => {
  res.json(Posts.all());
});

app.get("/posts/:id", (req, res) => {
  res.json(Posts.findOne(req.params.id))
});

app.post("/events", (req, res) => {
  try {
    console.log(`Event Received in QUERY SERVICE: ${req.body.name} \n MESSAGE: ${JSON.stringify(req.body.message)}`)
    QUERY_REDUCER(req.body, Posts)
    res.status(200);
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`QUERY SERVICE listening on port: ${PORT}`);
})