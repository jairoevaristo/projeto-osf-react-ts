import axios from 'axios';
import registrarAxiosMocks from '../config/axiosConfig';

const api = axios.create();

registrarAxiosMocks(api);

export default api;