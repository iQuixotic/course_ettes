import { CardInfo, Note} from "../..";

class CardNotesRef {

    private note_id: Note; 
    private card_id: CardInfo;

    constructor(obj) {
        if(!obj) {
            return;   
        }  
        this.note_id = obj.note_id;
        this.card_id = obj.card_id;

    }   
}

export default CardNotesRef;