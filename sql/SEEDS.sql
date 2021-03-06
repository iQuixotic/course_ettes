-- for seeding the roles table
INSERT INTO roles (_id, role) VALUES(1, 'admin');
INSERT INTO roles (_id, role) VALUES(2, 'reviewer');
INSERT INTO roles (_id, role) VALUES(3, 'creator');
INSERT INTO roles (_id, role) VALUES(4, 'default user');

INSERT INTO users (email, password, first_name, last_name, role_id)
    VALUES ('fromto@yahoo.com', 'finfin', 'Larry', 'Finance', 1);
INSERT INTO users (email, password, first_name, last_name, role_id)
    VALUES ('electionguy_434@yahoo.com', 'adminadmin', 'Jim', 'Admin', 2);
INSERT INTO users (email, password, first_name, last_name, role_id)
    VALUES ('secretsquirrel96@yahoo.com', 'defaultdefault', 'Dan', 'Default', 3);
INSERT INTO users (email, password, first_name, last_name, role_id)
    VALUES ('patkumuji@yahoo.com', 'patpat', 'Patrick', 'Byrde', 4);
INSERT INTO users (email, password, first_name, last_name, role_id)
    VALUES ('shirleyj@yahoo.com', 'sarasara', 'Thommas', 'Ato', 1);


INSERT INTO cards_info (_id, author_id, front_content,back_content) VALUES(1, 1, 'Minus', 'it looks like the subtract sign');
INSERT INTO cards_info (_id, author_id, front_content,back_content) VALUES(2, 2, 'Minus', 'it looks like  add sign');
INSERT INTO cards_info (_id, author_id, front_content,back_content) VALUES(3, 2, 'Minus', 'it looks like best subtract sign');

INSERT INTO colors (color) VALUES('green');
INSERT INTO colors (color) VALUES('blue');
INSERT INTO colors (color) VALUES('pink');
INSERT INTO colors (color) VALUES('orange');
INSERT INTO colors (color) VALUES('red');

INSERT INTO colors_ref (owner_id, card_id, color_id) VALUES(1, 1, 2);
INSERT INTO colors_ref (owner_id, card_id, color_id) VALUES(1, 2, 5);
INSERT INTO colors_ref (owner_id, card_id, color_id) VALUES(1, 3, 2);
INSERT INTO colors_ref (owner_id, card_id, color_id) VALUES(1, 2, 5);

INSERT INTO decks_ref (user_id, card_id, deck_id) VALUES(3, 2, 1);
INSERT INTO decks_ref (user_id, card_id, deck_id) VALUES(3, 3, 1);
INSERT INTO decks_ref (user_id, card_id, deck_id) VALUES(3, 4, 1);
INSERT INTO decks_ref (user_id, card_id, deck_id) VALUES(3, 5, 1);
INSERT INTO decks_ref (user_id, card_id, deck_id) VALUES(3, 1, 2);
INSERT INTO decks_ref (user_id, card_id, deck_id) VALUES(3, 5, 2);

INSERT INTO card_notes_ref (_id, user_id, card_id) VALUES(3, 1, 1);
INSERT INTO card_notes_ref (_id, user_id, card_id) VALUES(3, 2, 2);


INSERT INTO user_notes (_id, card_note_id, tier, content) VALUES(3, 4, 'reference' 'this note is garbabge');
INSERT INTO user_notes (_id, card_note_id, tier, content) VALUES(2, 4, 'reference' 'this note is not garbabge');



