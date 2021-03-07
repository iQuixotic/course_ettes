

class CardInfo {

  private front_content: string;
  private back_content: string;

    constructor(obj) {
        if(!obj) {
            return;   
        }    
        this.front_content = obj.front_content;
        this.back_content = obj.back_content;
    }    
}

export default CardInfo;