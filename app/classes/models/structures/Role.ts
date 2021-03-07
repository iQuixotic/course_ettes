class Role {

    private role: string; 
    constructor(obj) {
        if(!obj) {
            return;   
        }  
        this.role = obj.role
    }
}

export default Role;