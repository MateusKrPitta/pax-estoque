import httpsInstance from "../url";

export const buscarSetor = async () => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');
 
    try {
        const response = await https.get('/setor', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Dados setor:', response.data); // Adicione este log
        return response.data; // Retorna os dados da API
    } catch (error) {
        console.error('Erro ao buscar setor:', error);
        throw error;
    }
};