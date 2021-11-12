const { ACTION_TYPES } = require("../events/action-types");
module.exports.QUERY_REDUCER = (evt, postService) => {
  switch (evt.name) {
    case ACTION_TYPES.POST_CREATED:
      postService.add(evt.message)
      break;
    case ACTION_TYPES.POST_UPDATED:
      postService.update(evt.message.id, evt.message)
      break;
    case ACTION_TYPES.COMMENT_CREATED:
      postService.attachComment(evt.message);
      break;
  }
}