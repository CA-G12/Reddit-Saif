// Elements
const posts = document.querySelector('.posts');
const signOutBtn = document.querySelector('.sign-out-btn');
const username = document.querySelector('.username');
const createPostBtn = document.querySelector('.create-post-btn');
const createPostXIcon = document.querySelector('.x-create-post-icon');
const createPostOverlay = document.querySelector('.create-post-overlay');
const { forms } = document;

// Actions

const validateCreatePost = (e) => {
  e.preventDefault();
  //   check empty values
  const isValidatedEmpty = validateEmptyForm(e);
  if (!isValidatedEmpty) return false;

  const postContent = e.target.querySelector('#create-post-content');
  if (!postContent.value.trim()) {
    handleError(postContent, 'Empty value is not allowed');
    return false;
  }
  handleError(postContent, '');

  return true;
};

const addPost = (e) => {
  const isValidated = validateCreatePost(e);
  if (!isValidated) return;

  const formData = {
    title: e.target['create-post-title'].value,
    content: e.target['create-post-content'].value,
    img: e.target['create-post-img'].value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  fetch('/api/v1/post', options)
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        myAlert(result.msg, 'done');
        e.target.reset();
        generalToggle(createPostOverlay);
        getPosts();
      } else {
        myAlert(result.msg, 'error');
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong', 'error'));
};
// events;
signOutBtn.addEventListener('click', signOutUser);
createPostBtn.addEventListener('click', () => generalToggle(createPostOverlay));
createPostXIcon.addEventListener('click', () => generalToggle(createPostOverlay));

forms['create-post-form'].addEventListener('submit', addPost);

setUsernameInHeader();
getPosts();
