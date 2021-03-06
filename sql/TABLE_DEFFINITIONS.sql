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
  author_id int references users(_id),
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
  owner_id int references users(_id),
  card_id int references cards_info(_id),
  color_id int references colors(_id)
);


---------------------------------------------------------------------------
-- for creating the decks_ref table (6)
CREATE TABLE decks_ref (
  user_id int references users(_id),
  card_id int references cards_info(_id),
  deck_id VARCHAR(255)
);

---------------------------------------------------------------------------
-- for creating the decks_ref table (7)
CREATE TABLE card_notes_ref (
  _id SERIAL PRIMARY KEY,
  user_id int references users(_id),
  card_id int references cards_info(_id)
);

---------------------------------------------------------------------------
-- for creating the notes table (8)
CREATE TABLE user_notes (
  _id SERIAL PRIMARY KEY,
  card_note_id int references card_notes_ref(_id),
  tier VARCHAR(70),
  content VARCHAR(255)
);

