// Elements
const signUpBtn = document.querySelector('.sign-up-btn');
const signInBtn = document.querySelector('.sign-in-btn');
const createPostBtn = document.querySelector('.create-post-btn');
const singUpXIcon = document.querySelector('.x-sign-up-icon');
const singInXIcon = document.querySelector('.x-sign-in-icon');
const signUpOverlay = document.querySelector('.sign-up-overlay');
const signInOverlay = document.querySelector('.sign-in-overlay');
const posts = document.querySelector('.posts');

// Form elements
const { forms } = document;
const confirmPassword = document.querySelector('#confirm-password');
const signUpPassword = document.querySelector('#sign-up-password');

// actions

const validateSignUp = (e) => {
  e.preventDefault();
  //   check empty values
  const isValidatedEmpty = validateEmptyForm(e);
  if (!isValidatedEmpty) return false;

  //   check confirm password
  if (confirmPassword.value !== signUpPassword.value) {
    handleError(confirmPassword, 'Confirm password dose not match the password');
    return false;
  }
  handleError(confirmPassword, '');
  return true;
};

const validateSignIn = (e) => {
  e.preventDefault();
  //   check empty values
  const isValidatedEmpty = validateEmptyForm(e);
  if (!isValidatedEmpty) return false;

  return true;
};

const signUpUser = (e) => {
  const isValidated = validateSignUp(e);
  if (!isValidated) {
    return;
  }
  const formData = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
    img: e.target['user-img'].value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  fetch('/api/v1/sign-up', options)
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        myAlert(result.msg, 'done');
        e.target.reset();
        generalToggle(signUpOverlay);
        localStorage.setItem('reddit_username', result.username);
        window.location = './registeredUser/index.html';
      } else {
        myAlert(result.msg, 'error');
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong','error'));
};

const signInUser = (e) => {
  const isValidated = validateSignIn(e);
  if (!isValidated) return;

  const formData = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  fetch('/api/v1/sign-in', options)
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        myAlert(result.msg, 'done');
        e.target.reset();
        generalToggle(signInOverlay);
        localStorage.setItem('reddit_username', result.username);
        window.location = './registeredUser/index.html';
      } else {
        myAlert(result.msg, 'error');
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong', 'error'));
};
// Events
signUpBtn.addEventListener('click', () => generalToggle(signUpOverlay));
singUpXIcon.addEventListener('click', () => generalToggle(signUpOverlay));
signInBtn.addEventListener('click', () => generalToggle(signInOverlay));
singInXIcon.addEventListener('click', () => generalToggle(signInOverlay));

forms['sign-up-form'].addEventListener('submit', signUpUser);
forms['sign-in-form'].addEventListener('submit', signInUser);

createPostBtn.addEventListener('click', () => myAlert('You need to sign in to create a post', 'error'));

getPosts();
