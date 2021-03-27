import { CardInfo, Deck } from "../..";

class CardToDeckRef {

    private card_id: CardInfo;
    private deck_id: Deck;

    constructor(obj) {
        if(!obj) {
            return;   
        }  
        this.card_id = obj.card_id;
        this.deck_id = obj.deck_id;
    }   
}

export default CardToDeckRef;