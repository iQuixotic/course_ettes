import axios from 'axios';

export default {

    getCourseCards: () => {
        return axios.get('/roles');
    },

};