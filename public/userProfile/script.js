// Elements
const posts = document.querySelector('.posts');
const username = document.querySelector('.username');
const signOutBtn = document.querySelector('.sign-out-btn');
const userInfo = document.querySelector('.info');
const createPostOverlay = document.querySelector('.create-post-overlay');
const createPostXIcon = document.querySelector('.x-create-post-icon');
const { forms } = document;


// actions

const getUserPosts = () => {
  fetch('/api/v1/userPosts')
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        if (!result.msg.length) {
          renderData([], getUserPosts);
          displayMsg('There is no posts yet');
        } else {
          const userPosts = result.msg.map((ele) => ({ ...ele, canChange: true }));
          renderData(userPosts, getUserPosts);
          getUserLikes();
          getComments();
        }
      } else {
        displayMsg(result.msg);
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong', 'error'));
};

const renderUserInfo = (info) => {
  const usernameElement = document.createElement('h3');
  const usernameSpan = document.createElement('span');
  usernameSpan.textContent = 'Username : ';
  usernameElement.appendChild(usernameSpan);
  usernameElement.textContent += info.username;
  usernameElement.classList.add('username');
  userInfo.appendChild(usernameElement);

  const email = document.createElement('p');
  const emailSpan = document.createElement('span');
  emailSpan.textContent = 'Email : ';
  email.append(emailSpan);
  email.textContent += info.email;
  email.classList.add('user-email');
  userInfo.appendChild(email);

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('user-image');
  const userImg = document.createElement('img');
  userImg.src = info.img;
  userImg.alt = '';
  imageDiv.appendChild(userImg);
  userInfo.appendChild(imageDiv);
};
const getUserInfo = () => {
  fetch('/api/v1/userInfo')
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        if (!result.msg.length) {
          displayMsg('There is no info yet');
        } else {
          renderUserInfo(result.msg[0]);
        }
      } else {
        displayMsg(result.msg);
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong', 'error'));
};
const editPost = (e) => {
  e.preventDefault();
  const isValidated = validateCreatePost(e);
  if (!isValidated) return;

  const formData = {
    id: e.target.getAttribute('custom-id'),
    title: e.target['create-post-title'].value,
    content: e.target['create-post-content'].value,
    img: e.target['create-post-img'].value,
  };

  const options = {
    method: 'PUT',
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
        getUserPosts();
      } else {
        myAlert(result.msg, 'error');
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong', 'error'));
};

// events
signOutBtn.addEventListener('click', signOutUser);
document.addEventListener('scroll', () => showTopBtn(document.querySelector('.top-btn')));
createPostXIcon.addEventListener('click', () => generalToggle(createPostOverlay));
forms['create-post-form'].addEventListener('submit', editPost);

setUsernameInHeader();
getUserInfo();
getUserPosts();
