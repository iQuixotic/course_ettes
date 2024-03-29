# course_ettes

| Route | Use | Action Type |
| :---  | :---|     :---  |
| /register  | Register a new user   |      POST     |
| /login  | For logging in using http     |   POST |
| /colors  | Get a list of all available colors | GET |
| /ua/colors/:cardId/:colorId  | Update a user's card color | PATCH |
| /ua/cards-info/:deckId   | Get all cards of a deck by deck id   of an OWNED AND MANAGED     | GET |
| /ua/decks  | Get all of the authenticated decks available       | GET |
| /ua/decks/owned  | Get the name of all of the decks owned and managed by a user       | GET |
| /ua/cards-info/:deckId   | Add a card to a deck | POST |
| /ua/decks  | Add a deck      | POST |
| /ua/decks/subscribed | Get all of the decks that a user is subscribed to       | GET |
| /ua/decks/owned/:deckId  | Delete a deck by deck id       | DELETE |
| /ua/card-info/:cardId  | Edit a user's card        | PATCH |
| /ua/card-info/:cardId   | Delete a user's card       | DELETE |
| /ua/notes/:deckId   | Add a note to a card using that decks's id       | POST |
| /notes/:deckId/:noteId  | Update a note for a card       | PATCH |
| /notes/:deckId   | Delete a user note associated with a card      | DELETE |


| /users  | Return ALL users       | GET |
| /users  | Update a user's info       | PATCH |
| /users/:roleId  | Get a user's role info       | GET |
| /users/:id | Get a user by id       | GET |