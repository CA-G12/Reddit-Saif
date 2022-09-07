const generalToggle = (element) => {
  element.classList.toggle('show-overlay');
};

const handleError = (element, msg) => {
  const errorElement = element.closest('label').querySelector('.error');
  errorElement.textContent = msg;
  if (!errorElement.classList.contains('show-error')) {
    errorElement.classList.toggle('show-error');
  }
};

const myAlert = (msg, status) => {
  const p = document.createElement('p');
  p.textContent = msg;
  p.classList.add('my-alert');
  document.body.appendChild(p);
  if (status === 'done') {
    p.classList.add('my-alert-done');
  } else if (status === 'error') {
    p.classList.add('my-alert-error');
  }
  setTimeout(() => {
    document.body.removeChild(p);
  }, 3000);
};
const validateEmptyForm = (e) => {
  const inputs = e.target.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i += 1) {
    if (inputs[i].value.trim() === '') {
      handleError(inputs[i], 'Empty value is not allowed');
      return false;
    }
    handleError(inputs[i], '');
  }
  return true;
};

const addLike = (e) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch('/api/v1/like', options)
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        myAlert(result.msg, 'done');
      } else {
        myAlert(result.msg, 'error');
      }
    })
    .catch((err) => console.log(err));
};
const disLike = (e) => {

};
const renderData = (arr) => {
  posts.textContent = '';
  arr.forEach((ele) => {
    const post = document.createElement('div');
    post.classList.add('post');

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');
    const userImg = document.createElement('img');
    userImg.src = ele.user_img;
    userImg.alt = '';
    userInfo.appendChild(userImg);
    const username = document.createElement('div');
    username.classList.add('post-username');
    username.textContent = ele.username;
    userInfo.appendChild(username);
    post.appendChild(userInfo);

    const postTitle = document.createElement('h3');
    postTitle.classList.add('post-title');
    postTitle.textContent = ele.title;
    post.appendChild(postTitle);

    const postContent = document.createElement('p');
    postContent.classList.add('post-content');
    postContent.textContent = ele.content;
    post.appendChild(postContent);

    const postImage = document.createElement('div');
    postImage.classList.add('post-image');
    const img = document.createElement('img');
    img.src = ele.img;
    img.alt = ele.title;
    postImage.appendChild(img);
    post.appendChild(postImage);

    const postVotes = document.createElement('div');
    postVotes.classList.add('votes');
    const likeIcon = document.createElement('i');
    likeIcon.classList.add('fa-solid', 'fa-caret-up');
    likeIcon.addEventListener('click', addLike);
    postVotes.appendChild(likeIcon);
    const numLikes = document.createElement('span');
    numLikes.classList.add('num-votes');
    numLikes.textContent = ` ${ele.count} `;
    postVotes.appendChild(numLikes);
    const disLikeIcon = document.createElement('i');
    disLikeIcon.classList.add('fa-solid', 'fa-caret-down');
    disLikeIcon.addEventListener('click', disLike);
    postVotes.appendChild(disLikeIcon);
    post.appendChild(postVotes);

    posts.appendChild(post);
  });
};
const displayMsg = (msg) => {
  const p = document.createElement('p');
  p.classList.add('error-msg');
  p.textContent = msg;
  posts.appendChild(p);
};
const getPosts = () => {
  fetch('/api/v1/posts')
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        if (!result.msg.length) {
          displayMsg('There is no posts yet');
        } else {
          renderData(result.msg);
        }
      } else {
        displayMsg(result.msg);
      }
    })
    .catch((err) => console.log(err));
};
