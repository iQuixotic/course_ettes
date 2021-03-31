class Color {

    color: string; 
    
    constructor(obj) {
        if(!obj) {
            return;   
        }  
        this.color = obj.color;
    }   
}

export default Color;