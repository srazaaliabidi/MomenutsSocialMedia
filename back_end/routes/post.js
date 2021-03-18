var express = require ('express');
var router = express.Router ();

// router to search, uses postmodel to search and return results
// see models/posts.js
// see front_end/momentus/src/frontendsjs.js
router.get ('/search', async (req, res, next) => {
  try {
    let searchTerm = req.query.search;
    if (!searchTerm) {
      res.send ({
        message: '',
        results: [],
      });
    } else {
      let results = await PostModel.search (searchTerm);
      console.log (results);
      if (results) {
        res.send ({
          message: `${results.length} results`,
          results: results,
        });
      } else {
        res.send ({
          message: 'No results',
          results: results,
        });
      }
    }
  } catch (err) {
    next (err);
  }
});

module.exports = router;
