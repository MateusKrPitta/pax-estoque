import httpsInstance from "../url";

export const buscarFornecedor = async () => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');
    
    try {
        const response = await https.get('/fornecedor', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Dados fornecedor:', response.data); // Adicione este log
        return response.data; // Retorna os dados da API
    } catch (error) {
        console.error('Erro ao buscar fornecedor:', error);
        throw error;
    }
};