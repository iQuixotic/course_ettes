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
    getSubscribedDecks: () => {
        return axios.get('/ua/decks/subscribed', {
            headers: {
                'Content-Type':'application/json',                
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            },
            // body: JSON.stringify(obj)
        })

    },

    addToSubscribedDecks: (data) => {
        console.log(data)
        return axios.post('/ua/decks/subscribed', data, {
            headers: {
                // 'Content-Type':'application/json',                
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
        })

    },
    getOwnedDecks: () => {
        return axios.get('/ua/decks/owned', {
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

    createNewDeck: (deck) => {
        const data = {
            name: deck,
            visibility_id: 1
        }
        console.log('- the deck is ------> ', deck)
        return axios.post('/ua/decks', data, {
            headers: {           
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
        })
    },

    createNewCard: (fc, bc, id) => {
        const data = {
            front_content: fc,
            back_content: bc
        }
        console.log('createing new card', data, id)
        // console.log( data)
        return axios.post(`/ua/cards-info/${id}`, data, {
            headers: {      
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
        })
    },

    getCourseCards: () => {
        return axios.get('/roles');
    },
    
    getCardsbyDeckId: (deckId) => {
        return axios.get('/ua/cards-info/' + deckId, {
            headers: {
                'Content-Type':'application/json',                
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
        })
    },

    deleteDeck: (deckId) => {
        return axios.delete('/ua/decks/owned/' + deckId, {
            headers: {      
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
        })
    },

    updateCardColor: (cardId, colorId) => {
        return axios.get(`/ua/colors/${cardId}/${colorId}`, {
            headers: {      
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
        })        
    }
}