-- Make a new deck
    -- where values are variables
INSERT INTO decks (name) VALUES('Dominos');
    -- next you will get the deckId for the newl created and pass that to the table for deck owners...
 INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES(2, (SELECT currval(pg_get_serial_sequence('decks','_id'))));
    -- finally, update this in the user deck library
 INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES(2, (SELECT currval(pg_get_serial_sequence('decks','_id'))));


 