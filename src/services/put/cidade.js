import httpsInstance from "../url";

export const atualizarCidade = async (id, nome, uf) => {
  const https = httpsInstance();
  const token = localStorage.getItem("token");

  try {
    console.log("Atualizando cidade com ID:", id, "Novo Nome:", nome, "UF:", uf); // Log para depuração

    const response = await https.put(
      `/cidade/${id}`,
      { nome, uf }, // Enviando o nome e a UF atualizados
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar cidade:", error);
    throw error;
  }
};