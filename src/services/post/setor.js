import httpsInstance from "../url";

export const criarSetor = async (nome, unidadeId) => {
    const https = httpsInstance();
    
    // Pegando o token do localStorage
    const token = localStorage.getItem('token');

    try {
        const response = await https.post('/setor', {
            nome,
            unidadeId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho
                "Content-Type": "application/json",
            },
        });

        return response.data; // ou qualquer outra coisa que você precise
    } catch (error) {
        console.error('Erro ao criar setor:', error);
        throw error; // ou trate o erro de outra forma
    }
};
