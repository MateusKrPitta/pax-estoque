import httpsInstance from "../url";

export const criarProduto = async (nome, categoriaId, fornecedorId) => {
    const https = httpsInstance();
    
    // Pegando o token do localStorage
    const token = localStorage.getItem('token');

    try { 
        const response = await https.post('/produto', {
            nome,
            categoriaId,
            fornecedorId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho
                "Content-Type": "application/json",
            },
        });

        return response.data; // ou qualquer outra coisa que você precise
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error; // ou trate o erro de outra forma
    }
};
