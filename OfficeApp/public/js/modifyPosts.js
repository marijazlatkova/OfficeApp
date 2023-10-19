const toggleElementDisplay = (element) => {
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
};

const toggleCommentFormAndText = (id) => {
  const form = document.getElementById(`comment-${id}`);
  const comment = document.getElementById(`comment-text-${id}`);
  
  toggleElementDisplay(form);
  toggleElementDisplay(comment);
};

const modifyPosts = (id) => {
  toggleCommentFormAndText(id);
};