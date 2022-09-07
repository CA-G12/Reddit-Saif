insert into users (username, email, password, img) values 
('seef', 'seefhayek4@gmail.com', '123456', 'sdfa'), 
('seef2', 'seefhayek42@gmail.com', '123456', 'sdfa'), 
('seef3', 'seefhayek43@gmail.com', '123456', 'sdfa');

insert into posts (title, content, img, user_id) values 
('lorem', 'lorem ipsum is the best', 'https://picsum.photos/200', 1),
('lorem 2', 'lorem ipsum 2 is the best', 'https://picsum.photos/200', 1),
('lorem 3', 'lorem ipsum 3 is the best', 'https://picsum.photos/200', 2),
('lorem 4', 'lorem ipsum 4 is the best', 'https://picsum.photos/200', 2);

insert into votes (user_id, post_id) values 
(1,1),
(1,2),
(2,1),
(2,4);