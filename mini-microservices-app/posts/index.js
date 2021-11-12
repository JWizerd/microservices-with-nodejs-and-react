const express = require("express");
const cors = require("cors");
const PostService = require("../common/services/post-service");
const { ACTION_TYPES } = require("../common/events/action-types");
const { DISPATCH } = require("../common/events/dispatch");
const { POSTS_REDUCER } = require("../common/reducers/post-reducer");
const PORT = 9100;
const app = express();
const Posts = new PostService();

const postExistsMiddleware = async (req, res, next) => {
  if (!Posts.findOne(req.params.id)) {
    return res.status(404).json({
      message: `Post: ${req.params.id} not found!`
    });
  }

  next();
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post("/posts", (req, res) => {
  if (!req.body.title) throw new Error("ERROR: Title must be defined!");

  const post = Posts.create(req.body);
  DISPATCH(ACTION_TYPES.POST_CREATED, post);
  res.json(post);
});

app.patch("/posts/:id", postExistsMiddleware, (req, res) => {
  const post = Posts.update(req.params.id, req.body);
  DISPATCH(ACTION_TYPES.POST_UPDATED, post);
  res.json(post);
});

app.post("/events", (req, res) => {
  console.log(`Event Received in POSTS SERVICE: ${req.body.name} \n MESSAGE: ${JSON.stringify(req.body.message)}`)
  try {
    POSTS_REDUCER(req.body, Posts);
    res.status(200);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

app.listen(PORT, () => {
  console.log(`POSTS SERVICE listening on port: ${PORT}`);
})