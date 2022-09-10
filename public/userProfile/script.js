// Elements
let posts = document.querySelector('.posts');
const username = document.querySelector('.username');
const signOutBtn = document.querySelector('.sign-out-btn');
const userInfo = document.querySelector('.info');

// actions

const getUserPosts = () => {
  fetch('/api/v1/userPosts')
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        if (!result.msg.length) {
          displayMsg('There is no posts yet');
        } else {
          renderData(result.msg, getUserPosts);
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

// events
signOutBtn.addEventListener('click', signOutUser);

setUsernameInHeader();
getUserInfo();
getUserPosts();
