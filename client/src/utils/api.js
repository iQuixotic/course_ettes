import axios from 'axios';

export default {

    /* should return deck id here */
    createEmptyDeck: () => {
        axios.post('/decks')
        .then((res) => console.log(res)) // should do this part of call on front? call setState here?
    },

    /* 
    To do this, will need to get the id from the previously creted empty deck first
    */
    addCardToDeck: (id) => {
        return axios.post('/decks' + id);
    },


};