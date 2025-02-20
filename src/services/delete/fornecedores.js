import httpsInstance from "../url";

export const deletarFornecedor = async (id) => {
    const https = httpsInstance();
    const token = localStorage.getItem('token');
  
    try {
      console.log('Deletando fornecedor com ID:', id); // Adicione este log
      const response = await https.delete(`/fornecedor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
   
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
      throw error;
    }
  };