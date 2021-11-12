const { ACTION_TYPES } = require("../events/action-types");
module.exports.POSTS_REDUCER = (evt, postService) => {
  switch (evt.name) {
    case ACTION_TYPES.COMMENT_CREATED:
      postService.attachComment(evt.message);
      break;
  }
}