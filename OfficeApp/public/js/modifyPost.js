const modifyPost = (id) => {
  const form = document.getElementById(`comment-${id}`);
  const p = document.getElementById(`commentText-${id}`);
  const saveButton = document.querySelector(
    `button[data-post-id="${id}"]`
  );
  form.style.display = form.style.display === "none" ? "block" : "none";
  p.style.display = p.style.display === "none" ? "block" : "none";
  saveButton.style.display =
    saveButton.style.display === "none" ? "inline-block" : "none";
};