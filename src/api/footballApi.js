import axios from 'axios';

// const headers = {
//     'Content-Type': 'application/json',
//     'X-Auth-Token': 'b1dbb583f67a44cab16dace079025694'
// };

export default axios.create({
    baseURL: 'https://api.football-data.org/v2',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'b1dbb583f67a44cab16dace079025694'
    }
});