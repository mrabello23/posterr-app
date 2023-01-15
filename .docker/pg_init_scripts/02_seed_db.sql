-- User seed
INSERT INTO "user" ("id", "name", "email", "username", "userpass")
VALUES ('efe38133-df4c-4ab5-b9c2-d585931eb946', 'User 1', 'user1@email.com', 'usr1abc', '123abc');

INSERT INTO "user" ("id", "name", "email", "username", "userpass")
VALUES ('ceddaba1-fccb-4e43-a5da-5daa7e7b4b23', 'User 2', 'user2@email.com', 'usr2abc', '456def');

INSERT INTO "user" ("id", "name", "email", "username", "userpass")
VALUES ('ba071706-dcc0-446c-b089-f190962af5b6', 'User 3', 'user3@email.com', 'usr3abc', '123abc');

INSERT INTO "user" ("id", "name", "email", "username", "userpass")
VALUES ('b5ea93f0-30b0-4d23-a805-9fb299ef6c8a', 'User 4', 'user4@email.com', 'usr4abc', '456def');

-- Post seed
INSERT INTO "post" ("id", "text", "user_id", "repost")
VALUES ('809157e0-920a-43c8-8ab0-19ec348c7778', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'efe38133-df4c-4ab5-b9c2-d585931eb946', false);

INSERT INTO "post" ("id", "text", "user_id", "repost")
VALUES ('bd237a4a-8053-4d9b-9474-69e9c9eac3a0', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', 'ceddaba1-fccb-4e43-a5da-5daa7e7b4b23', false);

-- Repost seed
INSERT INTO "post" ("id", "text", "user_id", "repost", "original_post_id")
VALUES ('d11dee76-b328-4801-8e9e-5c68534f2c84', 'Quisque id diam vel quam elementum. Facilisis leo vel fringilla est ullamcorper eget nulla. Laoreet non curabitur gravida arcu. Cursus turpis massa tincidunt dui ut ornare lectus. Sed nisi lacus sed viverra tellus in. Vitae nunc sed velit dignissim. Vel eros donec ac odio tempor orci dapibus ultrices.', 'efe38133-df4c-4ab5-b9c2-d585931eb946', true, '809157e0-920a-43c8-8ab0-19ec348c7778');

INSERT INTO "post" ("id", "text", "user_id", "repost", "original_post_id")
VALUES ('9e130781-0ee2-4ad5-b6fc-5b30f84293e1', 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.', 'ba071706-dcc0-446c-b089-f190962af5b6', true, 'bd237a4a-8053-4d9b-9474-69e9c9eac3a0');

-- Quote seed
INSERT INTO "quotes" ("id", "text", "user_id", "original_post_id")
VALUES ('c2a50cdf-618b-4ec8-902d-d1cd0dbceb1b', 'No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.', 'b5ea93f0-30b0-4d23-a805-9fb299ef6c8a', '809157e0-920a-43c8-8ab0-19ec348c7778');

INSERT INTO "quotes" ("id", "text", "user_id", "original_post_id")
VALUES ('b46b21cc-494a-466d-ab88-5839dca42f3b', 'Cras sed felis eget velit aliquet. Blandit massa enim nec dui nunc mattis enim.', 'efe38133-df4c-4ab5-b9c2-d585931eb946', 'bd237a4a-8053-4d9b-9474-69e9c9eac3a0');