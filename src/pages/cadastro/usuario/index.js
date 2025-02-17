import React, { useState } from "react";
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
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TableComponent from '../../../components/table'
import './usuario.css'
import ButtonClose from "../../../components/buttons/button-close";
import { headerUsuario } from "../../../entities/headers/header-cadastro/header-usuario";
import { usuarios } from "../../../utils/json/usuario";
import ModalLateral from '../../../components/modal-lateral'
import { unidade } from "../../../utils/json/unidades";
import { criarUsuario } from "../../../services/post/usuario";

const Usuario = () => {
  const [cadastro, setCadastro] = useState(false);
  const [selectedUnidade, setSelectedUnidade] = useState(null);
  const [selectedSetores, setSelectedSetores] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [showAddedItems, setShowAddedItems] = useState(false);
  const [editar, setEditar] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  // Definindo rows a partir de usuarios
  const rows = unidade.map(usuario => ({
    Nome: usuario.nome,
    Unidade: usuario.unidade,
  }));

  const tiposUsuarios = [
    { value: 1, label: 'Administrador' },
    { value: 2, label: 'Financeiro' },
    { value: 3, label: 'Gerente de Unidade' },
    { value: 4, label: 'Colaborador' },
  ];

  const unidades = [
    { value: 1, label: 'Dourados' },
    { value: 2, label: 'Itaporã' },
    { value: 3, label: 'Ponta Porã' },
  ];

  const permissao = [
    { value: 1, label: 'Visualizar' },
    { value: 2, label: 'Editar' },
    { value: 3, label: 'Visualizar/Editar' },
  ];

  const setores = [
    { value: 1, label: 'RH' },
    { value: 2, label: 'TI' },
    { value: 3, label: 'Suporte' },
  ];

  const handleUnidade = (event) => {
    const selected = unidades.find(u => u.value === event.target.value);
    setSelectedUnidade(selected);
  };

  const handleSetores = (event) => {
    const { target: { value } } = event;
    const selected = setores.filter(s => value.includes(s.value));
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
        setores: selectedSetores.map(setor => ({ ...setor, permissao: '' }))
      };
      setAddedItems([...addedItems, newItem]);
      setSelectedUnidade(null);
      setSelectedSetores([]);
      setShowAddedItems(true); // Mostra a seção ao adicionar um item
    }
  };

  const handlePermissaoChange = (setorValue, newPermissao) => {
    const updatedItems = addedItems.map(item => {
      if (item.setores.some(setor => setor.value === setorValue)) {
        return {
          ...item,
          setores: item.setores.map(setor =>
            setor.value === setorValue ? { ...setor, permissao: newPermissao } : setor
          )
        };
      }
      return item;
    });
    setAddedItems(updatedItems);
  };

  
  const handleCadastrar = async () => {
    try {
      const response = await criarUsuario(cpf, senha, nome, selectedUnidade, selectedSetores);
      console.log('Usuário cadastrado com sucesso:', response);

      // Limpar campos
      setNome('');
      setCpf('');
      setSenha('');
      setSelectedUnidade(null);
      setSelectedSetores([]);
      setShowAddedItems(false); // Se você estiver usando isso para mostrar os itens adicionados

      // Fechar o modal
      handleCloseModalCadastro();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

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
                rows={rows} // Passando rows para o TableComponent
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
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="CPF"
              name="nome"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '42%' } }}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactPageIcon />
                  </InputAdornment>
                ),
              }}
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
            />
            <SelectTextFields
              width={'200px'}
              icon={<LocationOnIcon fontSize="small" />}
              label={'Unidades'}
              backgroundColor={"#D9D9D9"}
              fontWeight={500}
              options={unidades}
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
                      const setor = setores.find(s => s.value === value);
                      return <Chip key={value} label={setor.label} />;
                    })}
                  </div>
                )}
              >
                {setores.map((setor) => (
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
                  <label className="w-[30%]">{` ${item.unidade.label} `}</label>
                  <div className="flex w-[60%] flex-col gap-2">
                    {item.setores.map(setor => (
                      <div key={setor.value} className="flex w-full">
                        <div className="flex w-full">
                          <label className="w-[40%]">{`${setor.label} `}</label>
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
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="CPF"
                name="nome"
                sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '45%' } }}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPageIcon />
                    </InputAdornment>
                  ),
                }}
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
                options={unidades}
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
                        const setor = setores.find(s => s.value === value);
                        return <Chip key={value} label={setor.label} />;
                      })}
                    </div>
                  )}
                >
                  {setores.map((setor) => (
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