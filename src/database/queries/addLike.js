const connection = require('../config/connection');

const addLike = (data) => connection.query('insert into votes (user_id, post_id, voteval) values ($1,$2,$3) on conflict (user_id,post_id) do update set voteVal = case votes.voteval when 0 then $3 when $3 then 0 when 1 then -1 when -1 then 1 end;', [data.user_id, data.post_id, data.voteVal]);

module.exports = addLike;
