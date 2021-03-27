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


INSERT INTO cards_info (front_content,back_content) VALUES('Minus', 'it looks like the subtract sign');
INSERT INTO cards_info (front_content,back_content) VALUES('Plus', 'I like to look at it with the +');
INSERT INTO cards_info (front_content,back_content) VALUES('Times', 'Rabbits multiply');
INSERT INTO cards_info (front_content,back_content) VALUES('Divide', 'Doughnutses');
INSERT INTO cards_info (front_content,back_content) VALUES('Algorithm', 'bla bla bla computers');
INSERT INTO cards_info (front_content,back_content) VALUES('Goats?', 'yaw yaw yaw several goats');
INSERT INTO cards_info (front_content,back_content) VALUES('Puppies', 'I saw several of the puppies in the road.');
INSERT INTO cards_info (front_content,back_content) VALUES('Dogs', 'I pet the dogies');
INSERT INTO cards_info (front_content,back_content) VALUES('Cats', 'They are meanies');

INSERT INTO colors (color) VALUES('green');
INSERT INTO colors (color) VALUES('blue');
INSERT INTO colors (color) VALUES('pink');
INSERT INTO colors (color) VALUES('orange');
INSERT INTO colors (color) VALUES('red');

INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 6, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 7, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 8, 2);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 6, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 6, 3);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 9, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 7, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 1, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 2, 4);


INSERT INTO decks (name) VALUES('Math');
INSERT INTO decks (name) VALUES('Animals');
INSERT INTO decks (name) VALUES('English');
INSERT INTO decks (name) VALUES('Stocks');
INSERT INTO decks (name) VALUES('Little Trash');
INSERT INTO decks (name) VALUES('Stons');

INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES(2, 1);
INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES(1, 2);
INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES(2, 3);
INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES(3, 4);
INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES(3, 5);
INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES(3, 6);

INSERT INTO user_notes (tier, content) VALUES('reference', 'this note is garbabge');
INSERT INTO user_notes (tier, content) VALUES('reference', 'this note is not garbabge');
INSERT INTO user_notes (tier, content) VALUES('pointless', 'this is pointless');
INSERT INTO user_notes (tier, content) VALUES('pointless', 'this note is futile');

INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(1, 2);
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(2, 2);
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(3, 2);
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(4, 2);
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(4, 3);
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(2, 5);

INSERT INTO card_notes_ref (note_id, card_id) VALUES(1, 1);
INSERT INTO card_notes_ref (note_id, card_id) VALUES(2, 2);
INSERT INTO card_notes_ref (note_id, card_id) VALUES(3, 3);
INSERT INTO card_notes_ref (note_id, card_id) VALUES(4, 2);


INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(1, 2);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(2, 2);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(3, 2);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(4, 3);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(5, 3);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(6, 1);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(7, 1);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(8, 1);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(9, 1);