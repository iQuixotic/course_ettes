import { User} from "../..";

class UserDeckLibraryRef {

    private user_id: User; 
    private deck_id: string;

    constructor(obj) {
        if(!obj) {
            return;   
        }  
        this.user_id = obj.user_id;
        this.deck_id = obj.deck_id;
    }   
}

export default UserDeckLibraryRef;