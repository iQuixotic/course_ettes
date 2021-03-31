class Notes {

  tier: string;
  content: string;

    constructor(obj) {
        if(!obj) {
            return;   
        }    
        this.tier = obj.tier
        this.content = obj.content;
    }    
}

export default Notes;