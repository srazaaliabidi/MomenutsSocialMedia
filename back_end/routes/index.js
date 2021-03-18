var express = require ('express');
var router = express.Router ();
const {
  getRecentPosts,
  getPostById,
} = require ('../middleware/posts_middleware');

/* GET home page. */
// uses recentpost function to display latest content
router.get ('/', getRecentPosts, function (req, res, next) {
  res.render ('index', {title: 'Express'});
});

// router to display individual post
router.get ('/post/:id(\\d+)', getPostById, (req, res, next) => {
  res.render ('text_post', {title: `${req.params.id}`});
});

module.exports = router;
