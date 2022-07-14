new_post_metadata = {
  url: window.location.href,
  author: document.querySelector(".author-name").firstChild.textContent,
  date: document.querySelector(".byline-meta-date").firstChild.textContent,
  title: document.querySelector(".article-title").textContent,
};

let readPosts = localStorage.getItem("read_posts_storage");
if (readPosts != null) {
  readPosts = JSON.parse(readPosts);
  let check = true;
  readPosts.forEach((e) => {
    if (e.url == new_post_metadata.url) check = false;
  });
  if (check) {
    readPosts.push(new_post_metadata);
    localStorage.setItem("read_posts_storage", JSON.stringify(readPosts));
  }
} else {
  readPosts = [new_post_metadata];
  localStorage.setItem("read_posts_storage", JSON.stringify(readPosts));
}
