const express = require("express");
var cors = require('cors');
const CommentService = require("../common/services/comment-service");
const PORT = 9200;
const app = express();
const Comments = new CommentService();
const { DISPATCH } = require("../common/events/dispatch");
const { ACTION_TYPES } = require("../common/events/action-types");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post("/posts/:postId/comments", (req, res) => {
  if (!req.body.comment) {
    return res.status(400).json({
      message: "Comment content must be defined!"
    })
  };

  try {
    const comment = Comments.create(req.params.postId, req.body);
    DISPATCH(ACTION_TYPES.COMMENT_CREATED, comment);
    res.status(201).json(comment);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/events", (req, res) => {
  console.log(`Event Received in COMMENTS SERVICE: ${req.body.name} \n MESSAGE: ${JSON.stringify(req.body.message)}`)
  res.status(200);
});

app.listen(PORT, () => {
  console.log(`COMMENTS SERVICE listening on port: ${PORT}`);
})