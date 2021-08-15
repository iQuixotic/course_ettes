class DeckInfo {

    name: string;
    visibility_id: number;

      constructor(obj) {
          if(!obj) {
              return;   
          }    
          this.name = obj.name;
          this.visibility_id = obj.visibility_id;
      }    
  }
  
  export default DeckInfo;