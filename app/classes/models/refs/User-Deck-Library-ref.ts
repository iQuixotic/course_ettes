import { User, Deck } from "../..";

class UserDeckLibraryRef {

    private user_id: User; 
    private deck_id: Deck;

    constructor(obj) {
        if(!obj) {
            return;   
        }  
        this.user_id = obj.user_id;
        this.deck_id = obj.deck_id;
    }   
}

export default UserDeckLibraryRef;