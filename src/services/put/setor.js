import httpsInstance from "../url";

export const atualizarSetor = async (id, nome, unidadeId) => {
  const https = httpsInstance();
  const token = localStorage.getItem("token");

  try {
    const response = await https.put(
      `/setor/${id}`, // Usa o id na URL
      { nome, unidadeId }, // Envia o nome e o unidadeId no corpo da requisição
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