import { CardInfo, Color, User } from "../..";

class ColorRef {

    private user_id: User; 
    private card_id: CardInfo;
    private color_id: Color;

    constructor(obj) {
        if(!obj) {
            return;   
        }  
        this.user_id = obj.owner_id;
        this.card_id = obj.card_id;
        this.color_id = obj.color_id;
    }   
}

export default ColorRef;