import { User, Deck } from "../..";

class DeckToUserRef {

    private creator_id: User; 
    private deck_id: Deck;

    constructor(obj) {
        if(!obj) {
            return;   
        }  
        this.creator_id = obj.creator_id;
        this.deck_id = obj.deck_id;
    }   
}

export default DeckToUserRef;