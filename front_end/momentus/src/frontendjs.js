function executeSearch () {
  let searchTerm = document.getElementById ('search-box').value;
  if (!searchTerm) {
    location.replace ('/');
    return;
  }
  let mainContent = document.getElementById ('main-content');
  let searchURL = `/post/search?search=${searchTerm}`;
  fetch (searchURL)
    .then (data => {
      return data.json ();
    })
    .then (data_json => {
      let newMainContentHTML = '';
      data_json.results.forEach (row => {
        newMainContentHTML += createPost (row);
      });
      mainContent.innerHTML = newMainContentHTML;
      if (data_json.message) {
        addFlashFromFrontEnd (data_json.message);
      }
    })
    .catch (err => console.log (err));
}

function createPost (postData) {
  return `<div id="posts-${postData.postid}" class="post">
    <div class="post-body">
        <p class="post-user">${postData.username}</p>
        <p class="post-caption">${postData.caption}</p>
        <p class="post-created">${postData.dateCreated}</p>
    </div>
</div>`;
}
