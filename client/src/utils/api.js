export default {

    addNewUser: (data) =>  { 
        let obj = {
            username: data.username,
            password: data.password,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email, 
            role_id: data.roleId
        }
        return fetch('/register', {
            method: 'POST',
            headers: {
            'Content-Type':'application/json'             
        },
            body: JSON.stringify(obj)
        })
    },

    login: (data) => {
        let obj = {
            username: data.username, // should be from authdata login
            password: data.password
        }    
        return fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(obj)
        })
    }

}