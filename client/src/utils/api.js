import axios from "axios";

export const API = {

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
            email: data.email, // should be from authdata login
            password: data.password
        }    
        return fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(obj)
        })
    },
    getUserDecks: () => {
        return axios.get('/ua/decks', {
            headers: {
                'Content-Type':'application/json',                
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            },
            // body: JSON.stringify(obj)
        })

    },
    getColors: () => {
        return axios.get('/colors');
    },

    getCourseCards: () => {
        return axios.get('/roles');
    },
    getCardsbyDeckId: (deckId) => {
        return axios.get('/cards-info/' + deckId)
    }
}