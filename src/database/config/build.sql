BEGIN;

DROP TABLE IF EXISTS users, posts CASCADE;

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
    foreign key (user_id) references users(id) on Delete CASCADE
);


COMMIT;