export default {

    // -- 1. insert a single db object
    insertOneUser: () => {
        return (
            `INSERT INTO users (email, password, first_name, last_name, role_id) 
            VALUES ($1, $2, $3, $4, $5);`
        );
    },

    // -- 2. for login
    login: (cols) => {
        return `select ${cols} from users where (email, password) = ($1, $2);`;
    },
      
    // -- 3. getting the hashed password
    getHashedPass: () => {
        return `select password from users where email = $1;`;
    },

    // -- 4. get the logged in user's _id
    getActiveUserId: () => {
        return `SELECT _id from users where email = $1`;
    },

    // -- 5. create a new deck
    addDeckName: () => {
        return `INSERT INTO decks (name) VALUES($1);`;
    },

    createNewDeckAssoc: () => {
        return (`
            WITH i AS (INSERT INTO decks_to_users_ref (creator_id, deck_id) VALUES($1, (SELECT currval(pg_get_serial_sequence('decks','_id')))))
            INSERT INTO user_deck_library_ref (user_id, deck_id) VALUES($1, (SELECT currval(pg_get_serial_sequence('decks','_id'))));
        `);
    },

    // -- 6. insert a card into a deck
    insertCardIntoDeck: () => {
        return `INSERT INTO cards_info (front_content, back_content) VALUES($1, $2);`;
    },

    createCardToDeckAssoc: () => {
        return `INSERT INTO card_to_decks_ref (card_id, deck_id) VALUES((SELECT currval(pg_get_serial_sequence('cards_info','_id'))), $1);`;
    },

    createColorAssoc: () => {
        return `INSERT INTO colors_ref (user_id, card_id, color_id) VALUES($1, (SELECT currval(pg_get_serial_sequence('cards_info','_id'))), 5);`;
    },

    // -- 7. get all of the cards from an owned deck
    getOwnedDeck: () => {
        return (`
            SELECT cards_info._id, cards_info.front_content, cards_info.back_content, decks.name
            FROM cards_info
            INNER JOIN card_to_decks_ref ON cards_info._id = card_to_decks_ref.card_id
            INNER JOIN decks ON card_to_decks_ref.deck_id = decks._id
            WHERE decks._id = $1;
        `)
    },

    // -- 8. get all of the available decks in a particular user's vault
    getUserDeckLibrary: () => {
        return (`
            SELECT decks.name
            FROM users
            INNER JOIN user_deck_library_ref ON users._id = user_deck_library_ref.user_id
            INNER JOIN decks ON user_deck_library_ref.deck_id = decks._id
            WHERE users._id = $1;
        `)
    },

    // -- 9. get all of the available decks OWNED and MANAGED by a particular user
    getAllOwnedDecks: () => {
        return (`
            SELECT decks.name
            FROM users
            INNER JOIN decks_to_users_ref ON users._id = decks_to_users_ref.creator_id
            INNER JOIN decks ON decks_to_users_ref.deck_id = decks._id
            WHERE users._id = $1;
        `)
    },

    // -- 10. get all the decks available in the system (limit for pagination)
    getAllDecks: () => {
        return `SELECT * FROM decks LIMIT 12 OFFSET $1;`;
    },

    // -- 11. get card by id
    getCardById: () => {
        return `SELECT * FROM cards_info WHERE _id = $1;`;
    },

    // -- 12. edit a card that is managed and owned by a particular user
    editOwnedCard: () => {
        return `UPDATE cards_info SET front_content = $1, back_content = $2 WHERE _id = $3;`
    },

    getCardEditRights: () => {
            return (`
                SELECT _id FROM cards_info WHERE _id IN (
                    SELECT card_id FROM card_to_decks_ref WHERE deck_id IN (
                        SELECT decks._id
                        FROM users
                        INNER JOIN decks_to_users_ref ON users._id = decks_to_users_ref.creator_id
                        INNER JOIN decks ON decks_to_users_ref.deck_id = decks._id
                        WHERE users._id = $1)) and _id = $2;
        `)
    },

    getDeckEditRights: () => {
        return (`
            SELECT decks._id, users._id
            FROM users
            INNER JOIN decks_to_users_ref ON users._id = decks_to_users_ref.creator_id
            INNER JOIN decks ON decks_to_users_ref.deck_id = decks._id
            WHERE users._id = $1 and decks._id = $2;
        `);
    },

    // -- 13. delete a card from a OWNED and MANAGED deck
    deleteOwnedCard: () => {
        return `DELETE FROM cards_info WHERE _id = $1`
    },

    // -- 14. change a card color for a particular card from within a particular user's library
    getColorById: () => {
        return `SELECT color FROM colors WHERE _id = $1;`;
    },

    changeCardColor: () => {
        return `UPDATE colors_ref SET color_id = $1 WHERE user_id = $2 AND card_id = $3;`
    },

    // -- 15. add a note to a card that belongs to a single user's card library
    addUserNote: () => {
        return `INSERT INTO user_notes (tier, content) VALUES($1, $2);`;
    },

    addNoteToCardAssoc: () => {
        return `INSERT INTO card_notes_ref (user_id, note_id, card_id) VALUES($1, (SELECT currval(pg_get_serial_sequence('user_notes','_id'))), $2);`
    },

    // -- 16. edit an existing note 
    editUserNote: () => {
        return ` UPDATE user_notes SET content = $1 WHERE _id = $2;`;
    },

    // -- 17. get card by id
    getNoteById: () => {
        return `SELECT * FROM user_notes WHERE _id = $1;`;
    },

    // -- 18. delete a user's note
    deleteUserNote: () => {
        return `DELETE FROM user_notes WHERE _id = $1;`;
    },

    // --19. get the rights for editing/deleting a deck based on who the user is
    // getDeckEditRights: () => {
    //     return `SELECT * FROM decks WHERE _id = $1;`;
    // },

    // -- 20. delete a deck that that is managed by a particular user
    deleteUserDeck: () => {
        return (`
            DELETE FROM cards_info USING decks WHERE cards_info._id IN (
                SELECT cards_info._id
                FROM cards_info
                INNER JOIN card_to_decks_ref ON cards_info._id = card_to_decks_ref.card_id
                INNER JOIN decks ON card_to_decks_ref.deck_id = decks._id
                WHERE decks._id = $1
            );

            DELETE FROM decks WHERE _id = $1;
        `);
    },

    // need to be able to get the expriry date and return it...
    // expiry time should probably be a separate table
        // this info should branch from notes? deck?
    // need table for keeping track of who is full member and who is partial
        // this info should branch from user
    // need to make sure that usernames are unique
    // check behavior of all calls with no data
    // find out what is the lowest and most neccessary values for data limits on the tables and implement
    // need some code coverage for tests...
    // oAuth?
    // rating system with stars and number of ratings
    // keywords on decks to keep track of when searching..
        // should have someway of searching cards themselves.. maybe if 5 have the searched for word? idk
    // search by deck name.. 
    // 


    // future - need to integrate with paypal, google, facebook.. expose a bitcoin wallet?
    

    // on the front end -
    // can i figure out how to print the notecards?
    // have a settings (account page)

}