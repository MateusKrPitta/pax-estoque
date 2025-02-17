import axios from "axios";

// Forçar a URL da API para localhost:3333
const API_URL = process.env.REACT_APP_BASE_API || 'http://localhost:3333/api/v1';

const httpsInstance = () => {
    const httpsAuthenticated = axios.create({
        baseURL: API_URL,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });

    httpsAuthenticated.interceptors.request.use(
        (config) => {
            const storedUser   = sessionStorage.getItem('user');
            if (storedUser  ) {
                const { token } = JSON.parse(storedUser  );
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return httpsAuthenticated;
};

export default httpsInstance;