import httpsInstance from "../url";

export const login = async (cpf, senha) => {
    const https = httpsInstance();
    try {
        const response = await https.post('/login', {
            cpf,
            senha
        });
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor' };
    }
};