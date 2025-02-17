import httpsInstance from "../url";

export const deletarCidade = async (id) => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');
  
    try {
      console.log('Deletando cidade com ID:', id); // Adicione este log
      const response = await https.delete(`/cidade/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar cidade:', error);
      throw error;
    }
  };