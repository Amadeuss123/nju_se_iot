import axios from 'axios';

const api = {
  get: async function(url, config = {}) {
    const result = await axios.get(url, config);
    return result;
  },

  post: async function(url, data, config = {}) {
    const result = await axios.post(url, data, config);
    return result;
  }
}


export default api;