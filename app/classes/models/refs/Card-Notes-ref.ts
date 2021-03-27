import { CardInfo, Note, User } from "../..";

class CardNotesRef {

    private user_id: User;
    private note_id: Note; 
    private card_id: CardInfo;

    constructor(obj) {
        if(!obj) {
            return;   
        }  
        this.user_id = obj.user_id;
        this.note_id = obj.note_id;
        this.card_id = obj.card_id;
    }   
}

export default CardNotesRef;