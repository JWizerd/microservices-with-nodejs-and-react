const { v4: uuidv4 } = require('uuid');

class PostService {
  constructor() {
    this._posts = {};
  }

  create(post) {
    const uuid = uuidv4();
    this._posts[uuid] = {
      ...post,
      id: uuid,
      comments: {}
    }

    return this._posts[uuid];
  }

  add(post) {
    this._posts[post.id] = post;
  }

  update(id, post) {
    const existingPost = this.findOne(id);
    this._posts[id] = { ...existingPost, ...post };
  }

  findOne(id) {
    return this._posts[id];
  }

  attachComment(comment) {
    if (this._posts[comment.postId]) {
      this._posts[comment.postId].comments[comment.id] = comment;
    }
  }

  all() {
    return this._posts;
  }
}

module.exports = PostService;