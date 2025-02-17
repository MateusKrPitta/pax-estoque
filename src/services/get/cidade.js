import httpsInstance from "../url";

export const buscarCidades = async () => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');

    try {
        const response = await https.get('/cidade', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Dados das cidades:', response.data); // Adicione este log
        return response.data; // Retorna os dados da API
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        throw error;
    }
};