import httpsInstance from "../url";

export const deletarProduto = async (id) => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');
  
    try {
      console.log('Deletando produto com ID:', id); // Adicione este log
      const response = await https.delete(`/produto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
   
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  };