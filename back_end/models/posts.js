const {createConnection} = require ('mysql');

const PostModel = {};

// gets post by post Id, displays results
PostModel.getPostById = postId => {
  let baseSQL = `SELECT u.username, p.caption FROM users u 
  JOIN posts p ON u.userID=userid WHERE p.id=?`;
  return connection
    .execute (baseSQL, [postId])
    .then (([results, fields]) => {
      return Promise.resolve (results);
    })
    .catch (err => Promise.reject (err));
};

// selects post attributes, displays posts based on number
PostModel.getNRecentPosts = noOfPosts => {
  let baseSQL = `SELECT u.username, p.type, p.postid, p.caption, p.postURL, p.dateCreated
    FROM users u JOIN posts p ON u.userID=userid ORDER BY dateCreated DESC LIMIT ?`;
  return connection
    .execute (baseSQL, [noOfPosts])
    .then (([results, fields]) => {
      return Promise.resolve (results);
    })
    .catch (err => Promise.reject (err));
};

// searches database for term.
// see frontendjs.js in front_end
// see middelware/posts_middleware.js
// see routes/post.js
PostModel.search = searchTerm => {
  let baseSQL = `SELECT postid, caption, concat_ws('', caption)
            AS haystack FROM posts HAVING haystack like ?;`;
  let sqlSearch = '%' + searchTerm + '%';
  return connection
    .execute (baseSQL, [sqlSearch])
    .then (([results, fields]) => {
      return Promise.resolve (results);
    })
    .catch (err => Promise.reject (err));
};

module.exports = PostModel;
