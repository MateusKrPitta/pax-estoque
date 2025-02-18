import httpsInstance from "../url";

export const buscarUnidades = async () => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');

    try {
        const response = await https.get('/unidade', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Dados das unidades:', response.data); // Adicione este log
        return response.data; // Retorna os dados da API
    } catch (error) {
        console.error('Erro ao buscar unidades:', error);
        throw error;
    }
};