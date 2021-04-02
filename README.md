# course_ettes


| Route | Use | Action Type |
| :---  | :----:|     ---:  |
| /register  | Register a new user   |      POST     |
| /login  | For logging in using http     |   POST |
| /users  | Return ALL users       | GET |
| /users  | Update a user's info       | PATCH |
| /users/:roleId  | Get a user's role info       | GET |
| /users/:id | Get a user by id       | GET |
| /colors  | Get a list of all available colors | GET |
| /colors/:cardId/:colorId  | Update a user's card color | PATCH |
| /decks  | Get all of the decks available       | GET |
| /decks  | Add a deck      | POST |
| /decks/subscribed | Get all of the decks that a user is subscribed to       | GET |
| /decks/owned  | Get all of the decks owned and managed by a user       | GET |
| /decks/owned/:deckId  | Delete a deck by deck id       | DELETE |
| /card-info/:cardId  | Edit a user's card        | PATCH |
| /card-info/:cardId   | Delete a user's card       | DELETE |
| /card-info/:deckId   | Add a card to a deck | POST |
| /card-info/:deckId   | Get cards by deck id        | GET |
| /notes/:cardId   | Add a note to a card using that card's id       | POST |
| /notes/:cardId/:noteId  | Update a note for a card       | PATCH |
| /notes/:cardId   | Delete a user note associated with a card      | DELETE |
