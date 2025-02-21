import React, { useState, useEffect } from "react";
import Navbar from '../../../components/navbars/header';
import HeaderPerfil from '../../../components/navbars/perfil';
import HeaderCadastro from '../../../components/navbars/cadastro';
import MenuMobile from "../../../components/menu-mobile";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { InputAdornment, TextField, Select, MenuItem, Chip, FormControl, InputLabel } from "@mui/material";
import { AddCircleOutline, Edit, Person, Save, Search } from "@mui/icons-material";
import ButtonComponent from "../../../components/button";
import CentralModal from "../../../components/modal-central"
import SelectTextFields from "../../../components/select"
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TableComponent from '../../../components/table'
import './usuario.css'
import ButtonClose from "../../../components/buttons/button-close";
import { headerUsuario } from "../../../entities/headers/header-cadastro/header-usuario";
import { criarUsuario } from "../../../services/post/usuario";
import ArticleIcon from '@mui/icons-material/Article';
import MaskedFieldCpf from "../../../utils/mascaras/cpf";
import CustomToast from "../../../components/toast";
import { useNavigate } from "react-router-dom";
import { buscarUsuario } from "../../../services/get/usuario";
import { buscarSetor } from "../../../services/get/setor";
import { buscarUnidades } from "../../../services/get/unidade";
import ModalLateral from "../../../components/modal-lateral";

const Usuario = () => {
  const navigate = useNavigate();
  const [cadastro, setCadastro] = useState(false);
  const [selectedUnidade, setSelectedUnidade] = useState(null);
  const [selectedTipoAcesso, setSelectedTipoAcesso] = useState(null);
  const [selectedSetores, setSelectedSetores] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [showAddedItems, setShowAddedItems] = useState(false);
  const [editar, setEditar] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [produtosCadastradas, setProdutosCadastradas] = useState([]);
  const [setoresCadastradas, setSetoresCadastradas] = useState([]);
  const [unidadesCadastradas, setUnidadesCadastradas] = useState([]);

  const tiposUsuarios = [
    { value: 1, label: 'Administrador' },
    { value: 2, label: 'Financeiro' },
    { value: 3, label: 'Gerente de Unidade' },
    { value: 4, label: 'Colaborador' },
  ];

  const permissao = [
    { value: 3, label: 'Visualizar' },
    { value: 4, label: 'Visualizar/Editar' },
  ];

  const handleUnidade = (event) => {
    const selected = unidadesCadastradas.find(u => u.value === event.target.value);
    setSelectedUnidade(selected);
  };

  const handleSetores = (event) => {
    const { target: { value } } = event;
    const selected = setoresCadastradas.filter(s => value.includes(s.value));
    setSelectedSetores(selected);
  };

  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);

  const handleModalEditar = () => setEditar(true);
  const handleCloseModalEditar = () => setEditar(false);

  const handleAddItem = () => {
    if (selectedUnidade && selectedSetores.length > 0) {
      const newItem = {
        unidade: selectedUnidade,
        setores: selectedSetores.map(setor => ({
          ...setor,
          permissao: selectedTipoAcesso // Atribui a permissão com base no tipo de acesso
        }))
      };
      setAddedItems([...addedItems, newItem]);
      setSelectedUnidade(null);
      setSelectedSetores([]);
      setShowAddedItems(true); // Mostra a seção ao adicionar um item
    }
  };



  const handleCadastrar = async () => {
    try {
      // Verifique se todos os campos estão preenchidos


      // Coletar o tipo de acesso selecionado
      const tipoAcesso = tiposUsuarios.find(t => t.value === selectedTipoAcesso);
      if (!tipoAcesso) {
        CustomToast({ type: "error", message: "Tipo de acesso inválido." });
        return;
      }

      // Formatar os setores e permissões
      const permissoes = addedItems.flatMap(item =>
        item.setores.map(setor => ({
          setorId: setor.value,
          permissao: setor.permissao // Agora estamos pegando a permissão correta
        }))
      );

      const token = localStorage.getItem('token'); // Obtenha o token do localStorage
      if (!token) {
        CustomToast({ type: "error", message: "Token de acesso não encontrado." });
        return;
      }

      const response = await criarUsuario(cpf, senha, nome, tipoAcesso.value, permissoes, token);
      CustomToast({ type: "success", message: "Usuário cadastrado com sucesso" });

      // Limpar campos
      setNome('');
      setCpf('');
      setSenha('');
      setSelectedUnidade(null);
      setSelectedSetores([]);
      setShowAddedItems(false);

      // Fechar o modal
      handleCloseModalCadastro();
    } catch (error) {
      CustomToast({ type: "error", message: "Erro ao cadastrar usuário" });
    }
  };

  const buscarProdutosCadastradas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
      return;
    }

    try {
      const response = await buscarUsuario();
      setProdutosCadastradas(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
        navigate('/');
      } else {
        console.error("Erro ao buscar unidades cadastradas:", error);
      }
    }
  };

  const buscarSetorCadastradas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redireciona para a página de login se não houver token
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." }); // Exibe o toast
      return;
    }

    try {
      const response = await buscarSetor(); // Chama a função que busca as cidades
      console.log('Dados setores cadastradas:', response); // Adiciona log para verificar os dados
      setSetoresCadastradas(response.data); // Atualiza o estado com os dados retornados
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." }); // Exibe o toast
        navigate('/'); // Redireciona para a página de login
      } else {
        console.error("Erro ao buscar setores cadastrados:", error);
      }
    }
  };

  const buscarUnidadesCadastradas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
      return;
    }

    try {
      const response = await buscarUnidades();
      setUnidadesCadastradas(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." });
        navigate('/');
      } else {
        console.error("Erro ao buscar unidades cadastradas:", error);
      }
    }
  };

  useEffect(() => {
    buscarProdutosCadastradas();
    buscarSetorCadastradas();
    buscarUnidadesCadastradas();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unidadesResponse = await buscarUnidades();
        const setoresResponse = await buscarSetor();

        const unidadesFormatadas = unidadesResponse.data.map(unidade => ({
          value: unidade.id,
          label: unidade.nome
        }));

        const setoresFormatados = setoresResponse.data.map(setor => ({
          value: setor.id,
          label: setor.nome
        }));

        setUnidadesCadastradas(unidadesFormatadas);
        setSetoresCadastradas(setoresFormatados);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex gap-4 ">
      <Navbar />
      <div className='flex flex-col gap-2 w-full items-end'>
        <MenuMobile />
        <HeaderPerfil />
        <h1 className='flex gap-2 items-center justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start   '>
          <AccountCircleIcon />Cadastro Usuários
        </h1>
        <div className='flex w-full gap-1 mt-9 '>
          <div className="hidden sm:hidden md:block w-[13%]">
            <HeaderCadastro />
          </div>
          <div className="w-[100%] itens-center mt-2 ml-2 sm:mt-0 md:flex md:justify-start flex-col md:w-[80%]">
            <div className="flex gap-2 flex-wrap w-full justify-center md:justify-start">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Buscar Usuário"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '40%' }, }}
              />
              <ButtonComponent
                startIcon={<Search fontSize='small' />}
                title={'Pesquisar'}
                subtitle={'Pesquisar'}
                buttonSize="large"
              />
              <ButtonComponent
                startIcon={<AddCircleOutline fontSize='small' />}
                title={'Cadastrar'}
                subtitle={'Cadastrar'}
                onClick={handleModalCadastro}
                buttonSize="large"
              />
            </div>
            <div className="w-[90%]">
              <TableComponent
                headers={headerUsuario}
                rows={produtosCadastradas.map(usuario => ({
                  Nome: usuario.nome,
                  Cpf: usuario.cpf,
                  Setor: usuario.setor, // Adicione o setor
                  Unidade: usuario.unidade, // Adicione a unidade
                }))} // Passando rows para o TableComponent
                actionsLabel={"Ações"} // Se você quiser adicionar ações
                actionCalls={{
                  edit: handleModalEditar,
                  delete: ''
                  // Aqui você pode adicionar ações como editar ou deletar
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <CentralModal
        tamanhoTitulo={'81%'}
        maxHeight={'90vh'}
        top={'20%'}
        left={'28%'}
        width={'600px'}
        icon={<AddCircleOutline fontSize="small" />}
        open={cadastro}
        onClose={handleCloseModalCadastro}
        title="Cadastrar Usuário"
      >
        <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
          <div className='mt-4 flex gap-3 flex-wrap'>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Nome do usuário"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <MaskedFieldCpf
              type="cpf"
              label="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              icon={<ArticleIcon />} // Substitua por um ícone se necessário
              iconSize={24}
              labelSize="small"
              width="41%" // Ou qualquer valor que você queira
            />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Senha"
              type="password"
              name="nome"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <SelectTextFields
              width={'225px'}
              icon={<ContactEmergencyIcon fontSize="small" />}
              label={'Tipo de Acesso'}
              backgroundColor={"#D9D9D9"}
              fontWeight={500}
              options={tiposUsuarios}
              onChange={(event) => setSelectedTipoAcesso(event.target.value)} // Certifique-se de que isso está correto
            />
            {selectedTipoAcesso !== 1 && selectedTipoAcesso !== 2 && ( // Se não for "Administrador"
              <>
                <SelectTextFields
                  width={'200px'}
                  icon={<LocationOnIcon fontSize="small" />}
                  label={'Unidades'}
                  backgroundColor={"#D9D9D9"}
                  fontWeight={500}
                  options={unidadesCadastradas} // Já está no formato correto
                  onChange={handleUnidade}
                />

                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '43%' } }}
                >
                  <InputLabel id="setores-label">Setores</InputLabel>
                  <Select
                    labelId="setores-label"
                    label="Setores"
                    multiple
                    value={selectedSetores.map(s => s.value)}
                    onChange={handleSetores}
                    renderValue={(selected) => (
                      <div>
                        {selected.map(value => {
                          const setor = setoresCadastradas.find(s => s.value === value);
                          return <Chip key={value} label={setor.label} />;
                        })}
                      </div>
                    )}
                  >
                    {setoresCadastradas.map((setor) => (
                      <MenuItem key={setor.value} value={setor.value}>
                        {setor.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <ButtonComponent
                  subtitle={'Adicionar'}
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddItem}
                />
                {showAddedItems && (
                  <div className="flex items-center w-full mt-2">
                    <label className="w-[25%] text-sm ml-3">Unidade</label>
                    <label className="w-[20%] text-sm">Setores</label>
                    {selectedTipoAcesso !== 4 && ( // Condição para mostrar o rótulo "Permissão"
                      <label className="w-[30%] text-sm">Permissão</label>
                    )}
                  </div>
                )}
                {showAddedItems && (
                  <div className='mt-4  w-[95%]' >
                    {addedItems.map((item, index) => (
                      <div key={index} style={{ border: '1px solid #006b33', borderRadius: "10px", }} className='flex p-4 mb-2 items-center'>
                        <label className="w-[30%]">{` ${item.unidade.label} `}</label>
                        <div className="flex w-[60%] flex-col gap-2">
                          {item.setores.map(setor => (
                            <div key={setor.value} className="flex w-full">
                              <div className="flex w-full">
                                <label className="w-[40%] text-xs">{`${setor.label} `}</label>
                                {selectedTipoAcesso !== 4 && (
                                  <SelectTextFields
                                    width={'150px'}
                                    icon={<LocationOnIcon fontSize="small" />}
                                    label={'Permissão'}
                                    backgroundColor={"#D9D9D9"}
                                    fontWeight={500}
                                    options={permissao}
                                    value={setor.permissao} // Define o valor da permissão
                                    onChange={(e) => {
                                      const newPermissao = e.target.value;
                                      const updatedItems = addedItems.map((item, index) => {
                                        if (index === addedItems.indexOf(item)) {
                                          return {
                                            ...item,
                                            setores: item.setores.map(s =>
                                              s.value === setor.value ? { ...s, permissao: newPermissao } : s
                                            )
                                          };
                                        }
                                        return item;
                                      });
                                      setAddedItems(updatedItems);
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <ButtonComponent
                            title={'Remover'}
                            onClick={() => {
                              const updatedItems = addedItems.filter((_, i) => i !== index);
                              setAddedItems(updatedItems);
                              if (updatedItems.length === 0) {
                                setShowAddedItems(false); // Esconde a seção se não houver mais itens
                              }
                            }}
                          />
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className='w-[95%] mt-2 flex items-end justify-end'>
            <ButtonComponent
              title={'Cadastrar'}
              subtitle={'Cadastrar'}
              startIcon={<Save />}
              onClick={handleCadastrar} // Adicione esta linha
            />
          </div>
        </div>
      </CentralModal>

      <ModalLateral
        width={'700px'}
        open={editar}
        handleClose={handleCloseModalEditar}
        tituloModal="Editar Usuário"
        icon={<Edit />}
        tamanhoTitulo="75%"
        conteudo={
          <div className="">
            <div className='mt-4 flex gap-3 flex-wrap'>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Nome do usuário"
                name="nome"
                sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <MaskedFieldCpf
                type="cpf"
                label="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                icon={<ArticleIcon />} // Substitua por um ícone se necessário
                iconSize={24}
                labelSize="medium"
                width="100%" // Ou qualquer valor que você queira
              />
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Senha"
                type="password"
                name="nome"
                sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '50%' } }}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <SelectTextFields
                width={'265px'}
                icon={<ContactEmergencyIcon fontSize="small" />}
                label={'Tipo de Acesso'}
                backgroundColor={"#D9D9D9"}
                fontWeight={500}
                options={tiposUsuarios}
              />
              <SelectTextFields
                width={'150px'}
                icon={<LocationOnIcon fontSize="small" />}
                label={'Unidades'}
                backgroundColor={"#D9D9D9"}
                fontWeight={500}
                options={unidadesCadastradas} // Changed from unidades to unidadesCadastradas
                onChange={handleUnidade}
              />

              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '45%' } }}
              >
                <InputLabel id="setores-label">Setores</InputLabel>
                <Select
                  labelId="setores-label"
                  label="Setores"
                  multiple
                  value={selectedSetores.map(s => s.value)}
                  onChange={handleSetores}
                  renderValue={(selected) => (
                    <div>
                      {selected.map(value => {
                        const setor = setoresCadastradas.find(s => s.value === value); // Changed from setores to setoresCadastradas
                        return <Chip key={value} label={setor.label} />;
                      })}
                    </div>
                  )}
                >
                  {setoresCadastradas.map((setor) => ( // Changed from setores to setoresCadastradas
                    <MenuItem key={setor.value} value={setor.value}>
                      {setor.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <ButtonComponent
                title={'Adicionar'}
                subtitle={'Adicionar'}
                startIcon={<AddCircleOutline />}
                onClick={handleAddItem}
              />
            </div>

            {showAddedItems && (
              <div className="flex items-center w-full mt-2">
                <label className="w-[25%] text-sm ml-3">Unidade</label>
                <label className="w-[20%] text-sm">Setores</label>
                <label className="w-[30%] text-sm">Permissão</label>
              </div>
            )}
            {showAddedItems && (
              <div className='mt-4 p-4 w-[95%]' style={{ border: '1px solid #006b33', borderRadius: "10px" }}>
                {addedItems.map((item, index) => (
                  <div key={index} className='flex'>
                    <label className="w-[30%] text-sm">{` ${item.unidade.label} `}</label>
                    <div className="flex w-[60%] flex-col gap-2">
                      {item.setores.map(setor => (
                        <div key={setor.value} className="flex w-full">
                          <div className="flex w-full">
                            <label className="w-[40%] text-sm">{`${setor.label} `}</label>
                            <SelectTextFields
                              width={'150px'}
                              icon={<LocationOnIcon fontSize="small" />}
                              label={'Permissão'}
                              backgroundColor={"#D9D9D9"}
                              fontWeight={500}
                              options={permissao}
                            />
                            <ButtonClose
                              subtitle={'Remover'}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <ButtonComponent
                      title={'Remover'}
                      onClick={() => {
                        const updatedItems = addedItems.filter((_, i) => i !== index);
                        setAddedItems(updatedItems);
                        if (updatedItems.length === 0) {
                          setShowAddedItems(false); // Esconde a seção se não houver mais itens
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className='w-[95%] mt-2 flex items-end justify-end'>
              <ButtonComponent
                title={'Salvar'}
                subtitle={'Salvar'}
                startIcon={<Save />}
              />
            </div>
          </div>
        }
      />
    </div>
  )
}

export default Usuario;