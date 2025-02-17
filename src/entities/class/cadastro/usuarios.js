import { cadastrosUsuarios } from "../../../utils/json/cadastro/usuarios.js";

export const usuario = cadastrosUsuarios.map(cadastrosUsuario => ({
    Unidade: cadastrosUsuario.Unidade,
    Nome: cadastrosUsuario.Nome,
  }));