import httpsInstance from "../url";

export const criarCidade = async (nome, uf) => {
    const https = httpsInstance();
    
    // Pegando o token do localStorage
    const token = localStorage.getItem('token');

    try {
        const response = await https.post('/cidade', {
            nome,
            uf, 
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho
                "Content-Type": "application/json",
            },
        });

        return response.data; // ou qualquer outra coisa que você precise
    } catch (error) {
        console.error('Erro ao criar cidade:', error);
        throw error; // ou trate o erro de outra forma
    }
};
