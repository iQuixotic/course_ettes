import { User, CardNotesRef } from '../..';

class Notes {

  private tier: string;
  private content: string;

    constructor(obj) {
        if(!obj) {
            return;   
        }    
        this.tier = obj.tier
        this.content = obj.content;
    }    
}

export default Notes;