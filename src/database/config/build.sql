BEGIN;

DROP TABLE IF EXISTS users, posts, votes, comments CASCADE;

CREATE TABLE users (
    id serial primary key,
    username varchar(255) not null unique,
    email text not null unique,
    password text not null,
    img text not null
);


CREATE TABLE posts (
    id serial primary key,
    title text not null,
    content text not null,
    user_id int not null,
    img text not null,
    created_date timestamp not null default CURRENT_TIMESTAMP,
    foreign key (user_id) references users(id) on Delete CASCADE
);

CREATE TABLE votes (
    user_id int not null,
    post_id int not null,
    voteVal int not null default 0,
    primary key (user_id, post_id),
    foreign key (user_id) references users(id) on Delete CASCADE,
    foreign key (post_id) references posts(id) on Delete CASCADE
);

CREATE TABLE comments (
    id serial primary key,
    post_id int not null,
    user_id int not null,
    content text not null,
    created_date timestamp not null default CURRENT_TIMESTAMP,
    foreign key (post_id) references posts(id) on Delete CASCADE,
    foreign key (user_id) references users(id) on Delete CASCADE
);

COMMIT;