const { v4: uuidv4 } = require('uuid');

class CommentService {
  constructor() {
    this._comments = {};
  }

  create(postId, comment) {
    if (!this._comments[postId]) {
      this._comments[postId] = {};
    }

    const uuid = uuidv4();

    this._comments[postId][uuid] = {
      id: uuid,
      comment: comment.comment,
      postId
    }

    return this._comments[postId][uuid];
  }

  all() {
    return this._comments;
  }
}

module.exports = CommentService;