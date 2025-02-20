import httpsInstance from "../url";

export const atualizarFornecedor = async (id, nome, cnpj, telefone) => {
  const https = httpsInstance();
  const token = localStorage.getItem("token");

  try {

    const response = await https.put(
      `/fornecedor/${id}`,
      { nome, cnpj, telefone }, // Enviando o nome atualizado
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar fornecedor:", error);
    throw error;
  }
};
