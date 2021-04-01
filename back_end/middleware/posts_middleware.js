const {getNRecentPosts, getPostById} = require ('../models/Posts');
const postsMiddleware = {};

postsMiddleware.getRecentPosts = async function (req, res, next) {
  try {
    let results = await getNRecentPosts (8);
    res.locals.results = results;
    if (results.length == 0) {
      req.flash ('error', 'No posts available.');
    }
    next ();
  } catch (err) {
    next (err);
  }
};

postsMiddleware.getPostById = async function (req, res, next) {
  try {
    let postId = req.params.id;
    let results = await getPostById (postId);
    if (results && results.length) {
      res.locals.currentPost = results[0];
      next ();
    } else {
      req.flash ('error', 'No post available.');
      res.redirect ('/');
    }
  } catch (error) {
    next (err);
  }
};

module.exports = postsMiddleware;
