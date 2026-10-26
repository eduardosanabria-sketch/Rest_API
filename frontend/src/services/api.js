import axios from 'axios';

let csrfToken = null;

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true 
});

// Función para obtener el token CSRF del backend
export const fetchCsrfToken = async () => {
    try {
        const response = await api.get('/v1/csrf-token');
        csrfToken = response.data.csrfToken;
        return csrfToken;
    } catch (error) {
        console.error('Error al obtener token CSRF:', error);
    }
};

api.interceptors.request.use(async (config) => {
    const metodo = config.method ? config.method.toLowerCase() : '';
    
    
    if (['post', 'put', 'delete', 'patch'].includes(metodo)) {
        if (!csrfToken) {
            await fetchCsrfToken();
        }
        if (csrfToken) {
            config.headers['x-csrf-token'] = csrfToken; 
        }
    }
    return config;
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 403 && error.response.data.includes('invalid csrf token')) {
            
            await fetchCsrfToken();
        }
        return Promise.reject(error);
    }
);

export default api;