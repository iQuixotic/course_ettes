-- for creating the roles table (1)
CREATE TABLE roles (
  _id SERIAL PRIMARY KEY,
  role varchar(100)
);

---------------------------------------------------------------------------
-- for creating the users table (2)
CREATE TABLE users (
  _id SERIAL PRIMARY KEY,
  email VARCHAR(70) UNIQUE,
  password VARCHAR(255),
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  role_id int references roles(_id)
);

---------------------------------------------------------------------------
-- for creating the cards_info table (3)
CREATE TABLE cards_info (
  _id SERIAL PRIMARY KEY,
  front_content VARCHAR(255),
  back_content VARCHAR(255)
);

---------------------------------------------------------------------------
-- for creating the colors table (4)
CREATE TABLE colors (
  _id SERIAL PRIMARY KEY,
  color VARCHAR(255) 
);

---------------------------------------------------------------------------
-- for creating the colors_ref table (5)
CREATE TABLE colors_ref (
  user_id int references users(_id),
  card_id int references cards_info(_id) ON DELETE CASCADE,
    FOREIGN KEY(card_id) REFERENCES cards_info(_id),
  color_id int references colors(_id)
);

---------------------------------------------------------------------------
-- for creating the decks_ref table (6)
CREATE TABLE decks (
  _id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

---------------------------------------------------------------------------
-- for creating the notes table (7)
CREATE TABLE user_notes (
  _id SERIAL PRIMARY KEY,
  tier VARCHAR(70),
  content VARCHAR(255)
);


---------------------------------------------------------------------------
-- for creating the decks_ref table (8)
CREATE TABLE card_to_decks_ref (
  card_id int references cards_info ON DELETE CASCADE,
    FOREIGN KEY(card_id) REFERENCES cards_info(_id),
  deck_id int references decks(_id) ON DELETE CASCADE,
    FOREIGN KEY(deck_id) REFERENCES decks(_id)
);

---------------------------------------------------------------------------
-- keeping track of who made the origional deck (and cards) (9)
CREATE TABLE decks_to_users_ref (
  creator_id int references users(_id),
  deck_id int references decks(_id) ON DELETE CASCADE,
   FOREIGN KEY(deck_id) REFERENCES decks(_id)
);

---------------------------------------------------------------------------
-- keeping track of who has a deck in their inventory (10)
CREATE TABLE user_deck_library_ref (
  user_id int references users(_id),
  deck_id int references decks(_id) ON DELETE CASCADE,
    FOREIGN KEY(deck_id) REFERENCES decks(_id)
);

---------------------------------------------------------------------------
-- for creating the decks_ref table (11)
CREATE TABLE card_notes_ref (
  user_id int references users(_id),
  note_id int references user_notes(_id) ON DELETE CASCADE,
    FOREIGN KEY(note_id) REFERENCES user_notes(_id),
  card_id int references cards_info(_id) ON DELETE CASCADE,
    FOREIGN KEY(card_id) REFERENCES cards_info(_id)
);