import httpsInstance from "../url";

export const atualizarProduto= async (id, nome, categoriaId, fornecedorId) => {
  const https = httpsInstance();
  const token = localStorage.getItem("token");

  try {
    const response = await https.put(
      `/produto/${id}`, // Usa o id na URL
      { id, nome, categoriaId, fornecedorId }, // Envia o nome e o unidadeId no corpo da requisição
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar setor:", error);
    throw error;
  }
};