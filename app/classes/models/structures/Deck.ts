

class DeckInfo {

    private name: string;

      constructor(obj) {
          if(!obj) {
              return;   
          }    
          this.name = obj.name;
      }    
  }
  
  export default DeckInfo;