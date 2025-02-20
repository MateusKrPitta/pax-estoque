import httpsInstance from "../url";

export const atualizarCategoria = async (id, nome) => {
  const https = httpsInstance();
  const token = localStorage.getItem("token");

  try {
    console.log("Atualizando categoria com ID:", id, "Novo Nome:", nome); // Log para depuração

    const response = await https.put(
      `/categoria/${id}`,
      { nome }, // Enviando o nome atualizado
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    throw error;
  }
};
