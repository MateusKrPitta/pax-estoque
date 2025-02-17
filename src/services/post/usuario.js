import httpsInstance from "../url";

export const criarUsuario = async (cpf, senha, nome, unidade, setores) => {
    const https = httpsInstance();
    try {
        const response = await https.post('/usuarios', {
            cpf,
            senha,
            nome,
            unidade: unidade.label, // ou o que for necessário
            setores: setores.map(setor => setor.label) // ou o que for necessário
        });
        return response.data; // ou qualquer outra coisa que você precise
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error; // ou trate o erro de outra forma
    }
};