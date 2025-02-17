import { cadastrosUnidades } from "../../../utils/json/cadastro/unidades.js";

export const unidades = cadastrosUnidades.map(cadastrosUnidade => ({
    Nome: cadastrosUnidade.Nome,
    CNPJ: cadastrosUnidade.CNPJ,
    Telefone: cadastrosUnidade.Telefone,
    Cidade: cadastrosUnidade.Cidade,
    Endereco: cadastrosUnidade.Endereco,
  }));