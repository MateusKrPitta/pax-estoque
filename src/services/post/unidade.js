import httpsInstance from "../url";

export const criarUnidade = async (nome, cnpj, telefone, endereco, cidadeId) => {
    const https = httpsInstance();
    
    // Pegando o token do localStorage
    const token = localStorage.getItem('token');

    try {
        const response = await https.post('/unidade', {
            nome,
            cnpj,
            telefone,
            endereco,
            cidadeId 
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho
                "Content-Type": "application/json",
            },
        });

        return response.data; // ou qualquer outra coisa que você precise
    } catch (error) {
        console.error('Erro ao criar unidade:', error);
        throw error; // ou trate o erro de outra forma
    }
};
