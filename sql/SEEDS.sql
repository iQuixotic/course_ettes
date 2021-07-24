-- for seeding the roles table
INSERT INTO roles (_id, role) VALUES(1, 'admin');
INSERT INTO roles (_id, role) VALUES(2, 'paid tier');
INSERT INTO roles (_id, role) VALUES(3, 'default tier');

INSERT INTO users (_id, email, password, first_name, last_name, role_id)
    VALUES (1, 'adminUser@yahoo.com', '$2b$10$T.uUR3zsDShmX4zXwidr8.aiVdEEzDRJXW.BbHjbf4g1Rw/TwsTSy', 'Admin', 'Trey', 1);
INSERT INTO users (_id, email, password, first_name, last_name, role_id)
    VALUES (2, 'paidUser@yahoo.com', '$2b$10$e4XFVJZsjJWIXheBKWXq4uCiPDnDhix9o7XXg3e7WifSiBx8Ik/uK', 'Paid', 'User', 2);
INSERT INTO users (_id, email, password, first_name, last_name, role_id)
    VALUES (3, 'defaultUser@yahoo.com', '$2b$10$X98qfJOXw0Tma2R9EX4BI.rHZt.ASTTqR0/D4UGpaN08CXcwdc/BO', 'Default', 'User', 3);


INSERT INTO cards_info (_id, front_content,back_content) VALUES(1, 'Minus', 'it looks like the subtract sign');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(2, 'Plus', 'I like to look at it with the +');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(3, 'Times', 'Rabbits multiply');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(4, 'Divide', 'Doughnutses Divide');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(5, 'Word Problem', 'If farmer John had seven apples, how many apples do I have left?');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(6, 'Word Problem #2', 'If I divide 12 donuts into a bakers dozen of people, how many donutses does each person get?');

INSERT INTO cards_info (_id, front_content,back_content) VALUES(7, 'Snakes', 'slither and make the sssssllss noise');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(8, 'Cows', 'Walk on 4+ hooves and makes the Mooo sound');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(9, 'Doggie', 'Goes Bark Bark and you cant help but to love them the most');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(10, 'Cats', 'Are very mean and they will probably hate you. They go Meow Meow.');

INSERT INTO cards_info (_id, front_content,back_content) VALUES(11, 'JQuery', 'A javascript library that is popular for easily accessing DOM elements');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(12, 'Python', 'A scripting language often used by white hat hackers/linux developers.');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(13, 'C#', 'A compiled languaged possibly developed and used by Microsoft. Has strict typing and uses the .Net Framework.');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(14, 'Javascript', 'A scripting language with loose typing');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(15, 'Typescript', 'Javascript, but with strict typing');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(16, 'Java', 'A compiled language with strict typing. Must use the JDK to work on Java code.');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(17, 'Linux', 'An operating System that is built on the Linux Kernal. Is open Source.');
INSERT INTO cards_info (_id, front_content,back_content) VALUES(18, 'Windows', 'An operating system that revolutionized lots of ish. Built by Bill Gates.');

INSERT INTO colors (_id, color) VALUES(1, 'green');
INSERT INTO colors (_id, color) VALUES(2, 'blue');
INSERT INTO colors (_id, color) VALUES(3, 'pink');
INSERT INTO colors (_id, color) VALUES(4, 'orange');
INSERT INTO colors (_id, color) VALUES(5, 'red');

INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 1, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 2, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 3, 2);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 4, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 5, 3);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 6, 5);

INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 7, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 8, 2);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 9, 2);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 10, 4);

INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 11, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 12, 3);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 13, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 14, 2);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 15, 4);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 16, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 17, 4);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(1, 18, 5);

INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 1, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 2, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 3, 2);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 4, 4);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 5, 4);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 6, 4);

INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 7, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 8, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 9, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(2, 10, 2);

INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 1, 3);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 2, 2);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 3, 2);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 4, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 5, 1);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 6, 1);

INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 11, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 12, 4);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 13, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 14, 4);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 15, 3);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 16, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 17, 5);
INSERT INTO colors_ref (user_id, card_id, color_id) VALUES(3, 18, 5);

INSERT INTO visibility (_id, type) VALUES(1, 'public');
INSERT INTO visibility (_id, type) VALUES(2, 'protected');
INSERT INTO visibility (_id, type) VALUES(3, 'private');

INSERT INTO decks (_id, name, visibility_id) VALUES(1, 'Math', 1);
INSERT INTO decks (_id, name, visibility_id) VALUES(2, 'Animals', 2);
INSERT INTO decks (_id, name, visibility_id) VALUES(3, 'Computers',1);
-- INSERT INTO decks (name) VALUES('Stocks');

INSERT INTO likes (user_id, deck_id, isGood) VALUES(1, 1, (CAST(0 AS BIT)));
INSERT INTO likes (user_id, deck_id, isGood) VALUES(1, 2, (CAST(1 AS BIT)));
INSERT INTO likes (user_id, deck_id, isGood) VALUES(1, 3, (CAST(1 AS BIT)));
INSERT INTO likes (user_id, deck_id, isGood) VALUES(2, 1, (CAST(0 AS BIT)));
INSERT INTO likes (user_id, deck_id, isGood) VALUES(2, 2, (CAST(1 AS BIT)));
INSERT INTO likes (user_id, deck_id, isGood) VALUES(2, 3, (CAST(0 AS BIT)));
INSERT INTO likes (user_id, deck_id, isGood) VALUES(3, 2, (CAST(1 AS BIT)));
INSERT INTO likes (user_id, deck_id, isGood) VALUES(3, 3, (CAST(1 AS BIT)));

--
-- INSERT INTO shared_statuses (status) VALUES('read');
-- INSERT INTO shared_statuses (status) VALUES('edit');
--


INSERT INTO share_with (deck_id, share_with_id) VALUES(2, 2);

INSERT INTO user_deck_notes (user_id, deck_id, content) VALUES (1, 3, 'JQuery seems super hard...');
INSERT INTO user_deck_notes (user_id, deck_id, content) VALUES (1, 3, 'JQuery still makes javascript easier once you get the hang of it');
INSERT INTO user_deck_notes (user_id, deck_id, content) VALUES (1, 3, 'I think that nvidia is using ASCII');
INSERT INTO user_deck_notes (user_id, deck_id, content) VALUES (1, 1, 'The fundamental therum of calculous is 7b + 4a = x');
INSERT INTO user_deck_notes (user_id, deck_id, content) VALUES (1, 1, 'Pathagerian Therum: a2 + b2 = c2');
INSERT INTO user_deck_notes (user_id, deck_id, content) VALUES (2, 1, 'math x 2 = math2');
INSERT INTO user_deck_notes (user_id, deck_id, content) VALUES (2, 1, 'Area for a circle: a = 2pir');
INSERT INTO user_deck_notes (user_id, deck_id, content) VALUES (2, 1, '3+7=10 - Dont FORGET!!!');

-- INSERT INTO deck_notes_ref (user_id, deck_id, note_id) VALUES ();

INSERT INTO decks_to_owners_ref (creator_id, deck_id) VALUES(3, 1);
INSERT INTO decks_to_owners_ref (creator_id, deck_id) VALUES(1, 2);
INSERT INTO decks_to_owners_ref (creator_id, deck_id) VALUES(3, 3);

-- INSERT INTO user_notes (tier, content) VALUES('reference', 'this note is garbabge');
-- INSERT INTO user_notes (tier, content) VALUES('reference', 'this note is not garbabge');
-- INSERT INTO user_notes (tier, content) VALUES('pointless', 'this is pointless');
-- INSERT INTO user_notes (tier, content) VALUES('pointless', 'this note is futile');

INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(1, 1);
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(1, 2);
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(1, 3);

INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(2, 1);
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(2, 2);

INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(3, 1);
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(3, 3);

-- INSERT INTO card_notes_ref (note_id, card_id) VALUES(1, 1);
-- INSERT INTO card_notes_ref (note_id, card_id) VALUES(2, 2);
-- INSERT INTO card_notes_ref (note_id, card_id) VALUES(3, 3);
-- INSERT INTO card_notes_ref (note_id, card_id) VALUES(4, 2);


INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(1, 1);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(2, 1);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(3, 1);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(4, 1);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(5, 1);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(6, 1);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(7, 2);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(8, 2);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(9, 2);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(10, 2);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(11, 3);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(12, 3);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(13, 3);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(14, 3);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(15, 3);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(16, 3);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(17, 3);
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES(18, 3);