const generalToggle = (element) => {
  element.classList.toggle('show-overlay');
};
const showTopBtn = (element) => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    element.classList.add('show-top-btn');
  } else {
    element.classList.remove('show-top-btn');
  }
};
const handleError = (element, msg) => {
  const errorElement = element.closest('label').querySelector('.error');
  errorElement.textContent = msg;
  if (!errorElement.classList.contains('show-error')) {
    errorElement.classList.toggle('show-error');
  }
};
const signOutUser = () => {
  window.location.href = './../';
};
const setUsernameInHeader = () => {
  username.textContent = localStorage.getItem('reddit_username') || 'Unknown';
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
const addLike = (e, getMyPosts) => {
  const postId = e.target.closest('.post').id;
  const likeNum = e.target.classList.contains('up') ? 1 : -1;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId, likeNum }),
  };
  fetch('/api/v1/like', options)
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        // getPosts();
        getMyPosts();
        myAlert(result.msg, 'done');
      } else {
        myAlert(result.msg, 'error');
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong','error'));
};
const renderData = (arr, getMyPosts) => {
  posts.textContent = '';
  arr.forEach((ele) => {
    const post = document.createElement('div');
    post.classList.add('post');
    post.id = ele.post_id;
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
    likeIcon.classList.add('fa-solid', 'fa-caret-up', 'up');
    likeIcon.addEventListener('click', (e) => addLike(e, getMyPosts));
    postVotes.appendChild(likeIcon);
    const numLikes = document.createElement('span');
    numLikes.classList.add('num-votes');
    numLikes.textContent = ` ${ele.sum || 0} `;
    postVotes.appendChild(numLikes);
    const disLikeIcon = document.createElement('i');
    disLikeIcon.classList.add('fa-solid', 'fa-caret-down', 'down');
    disLikeIcon.addEventListener('click', (e) => addLike(e, getPosts));
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
    commentForm.addEventListener('submit',(e) => addComment(e, getMyPosts));
    post.appendChild(commentForm);

    posts.appendChild(post);
  });
};
const displayMsg = (msg) => {
  const p = document.createElement('p');
  p.classList.add('error-msg');
  p.textContent = msg;
  posts.appendChild(p);
};
const setEditDeleteIcon = (post) => {
  const icons = document.createElement('div');
  icons.classList.add('icons');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid', 'fa-xmark', 'x-icon', 'delete-post-icon');
  icons.appendChild(deleteIcon);
  const editIcon = document.createElement('i');
  editIcon.classList.add('fa-solid', 'fa-pen-to-square', 'edit-icon');
  icons.appendChild(editIcon);

  post.appendChild(icons);
};
const getUserLikes = () => {
  fetch('/api/v1/userLikes')
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        const allPosts = document.querySelectorAll('.post');
        allPosts.forEach((post) => {
          result.msg.forEach((ele) => {
            // eslint-disable-next-line eqeqeq
            if (ele.post_id == post.id && ele.voteval === 1) {
              post.querySelector('.up').classList.add('light');
            // eslint-disable-next-line eqeqeq
            } else if (ele.post_id == post.id && ele.voteval === -1) {
              post.querySelector('.down').classList.add('light');
            }
          });
        });
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong', 'error'));
};
const createComment = (comment) => {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  commentDiv.id = comment.id;

  const p = document.createElement('p');
  p.classList.add('comment-text');
  p.textContent = comment.content;
  commentDiv.appendChild(p);

  const user = document.createElement('div');
  user.classList.add('comment-user');
  const username = document.createElement('p');
  username.textContent = comment.username;
  username.classList.add('comment-username');
  user.appendChild(username);
  const userImgDiv = document.createElement('div');
  userImgDiv.classList.add('comment-image');
  const userImg = document.createElement('img');
  userImg.src = comment.img;
  userImgDiv.appendChild(userImg);
  user.appendChild(userImgDiv);
  commentDiv.appendChild(user);
  return commentDiv;
};
const getComments = () => {
  fetch('/api/v1/comments')
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        const allPosts = document.querySelectorAll('.post');

        allPosts.forEach((post) => {
          const commentsDiv = document.createElement('div');
          commentsDiv.classList.add('comments');
          result.msg.forEach((comment) => {
            if (comment.post_id == post.id) {
              commentsDiv.appendChild(createComment(comment));
            }
            post.appendChild(commentsDiv);
          });
        });
      }
    })
    .catch((err) => console.log(err));
};
const getPosts = () => {
  fetch('/api/v1/posts')
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        if (!result.msg.length) {
          displayMsg('There is no posts yet');
        } else {
          renderData(result.msg, getPosts);
          getUserLikes();
          getComments();
        }
      } else {
        displayMsg(result.msg);
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong', 'error'));
};
const addComment = (e, getMyPosts) => {
  e.preventDefault();

  const isValidatedEmpty = validateEmptyForm(e);
  if (!isValidatedEmpty) return false;

  const commentText = e.target.comment.value;
  const postId = e.target.closest('.post').id;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commentText, postId }),
  };
  fetch('/api/v1/comment', options)
    .then((data) => data.json())
    .then((result) => {
      if (result.statusCode === 200) {
        e.target.reset();
        // getPosts();
        getMyPosts();
        myAlert(result.msg, 'done');
      } else {
        myAlert(result.msg, 'error');
      }
    })
    .catch((err) => myAlert(err.msg || err.message || 'Something went wrong', 'error'));
};
