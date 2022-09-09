// Elements
let posts = document.querySelector('.posts');
const username = document.querySelector('.username');
const signOutBtn = document.querySelector('.sign-out-btn');
const userInfo = document.querySelector('.info');

// actions
const renderUserPosts = (arr) => {
  posts.textContent = '';
  arr.forEach((ele) => {
    const post = document.createElement('div');
    post.classList.add('post');
    post.id = ele.post_id;
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info');
    const userImg = document.createElement('img');
    userImg.src = ele.user_img;
    userImg.alt = '';
    userInfoDiv.appendChild(userImg);
    const usernameDiv = document.createElement('div');
    usernameDiv.classList.add('post-username');
    usernameDiv.textContent = ele.username;
    userInfoDiv.appendChild(usernameDiv);
    post.appendChild(userInfoDiv);

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
    likeIcon.classList.add('fa-solid', 'fa-caret-up', 'up');
    likeIcon.addEventListener('click', (e) => addLike(e, getUserPosts));
    postVotes.appendChild(likeIcon);
    const numLikes = document.createElement('span');
    numLikes.classList.add('num-votes');
    numLikes.textContent = ` ${ele.sum || 0} `;
    postVotes.appendChild(numLikes);
    const disLikeIcon = document.createElement('i');
    disLikeIcon.classList.add('fa-solid', 'fa-caret-down', 'down');
    disLikeIcon.addEventListener('click', (e) => addLike(e, getUserPosts));
    postVotes.appendChild(disLikeIcon);
    post.appendChild(postVotes);

    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');
    const label = document.createElement('label');
    const commentInput = document.createElement('input');
    commentInput.classList.add('comment-input');
    commentInput.type = 'text';
    commentInput.required = true;
    commentInput.name = 'comment';
    commentInput.placeholder = 'Your comment';
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error');
    label.appendChild(commentInput);
    label.appendChild(errorSpan);
    commentForm.appendChild(label);
    const submitBtn = document.createElement('button');
    submitBtn.classList.add('btn', 'comment-submit');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Add Comment';
    commentForm.appendChild(submitBtn);
    commentForm.addEventListener('submit',(e) => addComment(e, getUserPosts));
    post.appendChild(commentForm);

    posts.appendChild(post);
  });
};

const getUserPosts = () => {
  fetch('/api/v1/userPosts')
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        if (!result.msg.length) {
          displayMsg('There is no posts yet');
        } else {
          // renderData(result.msg);
          renderUserPosts(result.msg);
          getUserLikes();
          getComments();
        }
      } else {
        displayMsg(result.msg);
      }
    })
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
};


// events
signOutBtn.addEventListener('click', signOutUser);

setUsernameInHeader();
getUserInfo();
getUserPosts();
