import httpsInstance from "../url"; // Certifique-se de que isso está correto

export const criarUsuario = async (cpf, senha, nome, tipo, setores, token) => {
    const https = httpsInstance();
    try {
        const response = await https.post('/usuario', {
            nome,
            cpf,
            senha,
            tipo,
            permissoes: setores.map(setor => ({
                setorId: setor.setorId, // Certifique-se de que `setor` tem um campo `setorId`
                permissao: setor.permissao // Certifique-se de que `setor` tem um campo `permissao`
            }))
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Inclua o token no cabeçalho
            }
        });
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error; // Lança o erro para ser tratado externamente
    }
};