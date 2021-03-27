-- 1. Make a new deck
    -- where values are variables
INSERT INTO decks (name) VALUES('Dominos');
    -- next you will get the deckId for the newl created and pass that to the table for deck owners...
INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES(2, (SELECT currval(pg_get_serial_sequence('decks','_id'))));
    -- finally, update this in the user deck library
INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(2, (SELECT currval(pg_get_serial_sequence('decks','_id'))));

-- 2. insert a card into a deck
    -- insert a card
INSERT INTO cards_info (front_content,back_content) VALUES('Dots', 'This is something to do with a domino, right?');
    -- associate the card with a deck
    -- the deck_id should be a provided variable in the req body
INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES((SELECT currval(pg_get_serial_sequence('cards_info','_id'))), 7);


-- 3. get all of the cards from an owned deck
    -- decks.id = req.params
SELECT cards_info, decks.name
FROM cards_info
INNER JOIN card_to_decks_ref ON cards_info._id = card_to_decks_ref.card_id
INNER JOIN decks ON card_to_decks_ref.deck_id = decks._id
where decks._id = 2;

-- 4. get all of the available decks in a particular user's vault
    -- users._id could be passed in params or obtained from token
SELECT users, decks.name
FROM users
INNER JOIN user_deck_library_ref ON users._id = user_deck_library_ref.user_id
INNER JOIN decks ON user_deck_library_ref.deck_id = decks._id
where users._id = 4;

-- 5. get all of the available decks OWNED and MANAGED by a particular user
    -- might could use a right-join for this..  
    -- users._id will be set from vaule in the token
SELECT decks
FROM users
INNER JOIN decks_to_users_ref ON users._id = decks_to_users_ref.creator_id
INNER JOIN decks ON decks_to_users_ref.deck_id = decks._id
where users._id = 3;

-- 6. get all the decks available in the system (limit for pagination)
    -- the offset will be kept in state from paginated page 
    -- and passed through a variable to be dynamic
SELECT * from decks LIMIT 5 OFFSET 3;

-- 7. edit a card that is managed and owned by a particular user
UPDATE cards_info SET front_content = 'Is this really it?' WHERE _id = 4;
-- , users
-- FROM cards_info
-- INNER JOIN decks_to_users_ref ON cards_info._id = decks_to_users_ref.deck_id
-- INNER JOIN users ON decks_to_users_ref.deck_id = users._id
-- where users._id = 2;

-- 8. delete a card from a OWNED and MANAGED deck
-- 9. change a card color for:
    -- a particular card
        -- within a particular user's library
-- 10. add a note to a card that belongs to a users card library
-- 11. edit an existing note 
-- 12. delete a deck that that is managed by a particular user
-- 