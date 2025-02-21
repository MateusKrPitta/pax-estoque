import httpsInstance from "../url";

export const buscarUsuario = async () => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');
    
    try {
        const response = await https.get('/usuario', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Dados usuario:', response.data); // Adicione este log
        return response.data; // Retorna os dados da API
    } catch (error) {
        console.error('Erro ao buscar usuario:', error);
        throw error;
    }
};