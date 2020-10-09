insert into helo_users (username, password, profile_pic)
values (${username}, ${hash}, ${profilePic})
returning id, username, profile_pic