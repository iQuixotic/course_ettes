import axios from 'axios';

export default {

    getColors: () => {
        return axios.get('/colors');
    },

};