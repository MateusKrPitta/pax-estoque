import httpsInstance from "../url";

export const buscarCategoria = async () => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');
    
    try {
        const response = await https.get('/categoria', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Dados categoria:', response.data); // Adicione este log
        return response.data; // Retorna os dados da API
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        throw error;
    }
};