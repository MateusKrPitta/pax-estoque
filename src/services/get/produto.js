import httpsInstance from "../url"; 

export const buscarProduto = async () => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');    
    
    try {
        const response = await https.get('/produto', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Dados produto:', response.data); // Adicione este log
        return response.data; // Retorna os dados da API
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
    }
};