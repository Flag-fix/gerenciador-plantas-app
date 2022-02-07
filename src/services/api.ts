import axios from "axios";

const api = axios.create({
    baseURL: 'https://gerenciador-plantas-default-rtdb.firebaseio.com'
});

export default api;