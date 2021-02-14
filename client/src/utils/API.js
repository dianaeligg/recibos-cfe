import axios from 'axios';

export default{
    getTest: () => {
        return axios.get('/test')
    }
}

