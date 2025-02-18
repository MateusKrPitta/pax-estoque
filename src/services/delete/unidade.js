import httpsInstance from "../url";

export const deletarUnidade = async (id) => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');
  
    try {
      const response = await https.delete(`/unidade/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar unidade:', error);
      throw error;
    }
  };