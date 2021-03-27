export default {

    // 1. create a new deck
    createNewDeck: (deckName, userName) => {
        return (`
            INSERT INTO decks (name) VALUES($1), [${deckName}];
            INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES($1, (SELECT currval(pg_get_serial_sequence('decks','_id')))), [${userName}];
            INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES($1, (SELECT currval(pg_get_serial_sequence('decks','_id')))), [${userName}];
        `);
    },

    // -- 2. insert a card into a deck
    insertCardIntoDeck: (frontContent, backContent, deckId) => {
        return(`
            INSERT INTO cards_info (front_content, back_content) VALUES($1, $2), [${frontContent}, ${backContent}];
            INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES((SELECT currval(pg_get_serial_sequence('cards_info','_id'))), $1), [${deckId}];
        `);
    },

    // -- 3. get all of the cards from an owned deck
    getOwnedDeck: (userId) => {
        return (`
            SELECT cards_info, decks.name
            FROM cards_info
            INNER JOIN card_to_decks_ref ON cards_info._id = card_to_decks_ref.card_id
            INNER JOIN decks ON card_to_decks_ref.deck_id = decks._id
            WHERE decks._id = $1, [${userId}];;
        `)
    },

    // -- 4. get all of the available decks in a particular user's vault
    getSingleUserDecks: (userId) => {
        return (`
            SELECT users, decks.name
            FROM users
            INNER JOIN user_deck_library_ref ON users._id = user_deck_library_ref.user_id
            INNER JOIN decks ON user_deck_library_ref.deck_id = decks._id
            WHERE users._id = $1, [${userId}];
        `)
    },

    // -- 5. get all of the available decks OWNED and MANAGED by a particular user
    getAllOwnedDecks: (userId) => {
        return (`
            SELECT decks
            FROM users
            INNER JOIN decks_to_users_ref ON users._id = decks_to_users_ref.creator_id
            INNER JOIN decks ON decks_to_users_ref.deck_id = decks._id
            WHERE users._id = $1, [${userId}];
        `)
    },

    // -- 6. get all the decks available in the system (limit for pagination)
    getAllDecks: (offset) => {
        return `SELECT * from decks LIMIT 12 OFFSET $1, [${offset}];`
    },

    // -- 7. edit a card that is managed and owned by a particular user
    editOwnedCard: (setWhat, content, id) => {
        return `UPDATE cards_info SET $1 = $2 WHERE _id = $3, [${setWhat}, ${content}, ${id}];`
    },

    // -- 8. delete a card from a OWNED and MANAGED deck
    deleteOwnedCard: (id) => {
        return `DELETE FROM cards_info WHERE _id = $1, [${id}];`
    },

    // -- 9. change a card color for a particular card from within a particular user's library
    changeCardColor: (colorId, userId, cardId) => {
        return `UPDATE colors_ref SET color_id = $1 WHERE user_id = $2 AND card_id = $3, [${colorId}, ${userId}, ${cardId}];`
    },

    // -- 10. add a note to a card that belongs to a single user's card library
    addUserNote: (tier, content, userId, cardId) => {
        return (`
            INSERT INTO user_notes (tier, content) VALUES($1, $2), [${tier}, ${content}];
            INSERT INTO card_notes_ref (user_id, note_id, card_id) VALUES($1, (SELECT currval(pg_get_serial_sequence('user_notes','_id'))), $2), [${userId}, ${cardId}];
        `);
    },

    // -- 11. edit an existing note 
    editUserNote: (content, id) => {
        return ` UPDATE user_notes SET content = $1 WHERE _id = $2, [${content}, ${id}];`;
    },

    // -- 12. delete a user's note
    deleteUserNote: (id) => {
        return `DELETE FROM user_notes WHERE _id = $1, [${id}];`;
    },

    // -- 13. delete a deck that that is managed by a particular user
    deleteUserDeck: (id) => {
        return (`
            DELETE FROM cards_info USING decks WHERE cards_info._id IN (
                SELECT cards_info._id
                FROM cards_info
                INNER JOIN card_to_decks_ref ON cards_info._id = card_to_decks_ref.card_id
                INNER JOIN decks ON card_to_decks_ref.deck_id = decks._id
                WHERE decks._id = $1
            ), [${id}];

            DELETE FROM decks WHERE _id = $1, [${id}];
        `);
    }
}