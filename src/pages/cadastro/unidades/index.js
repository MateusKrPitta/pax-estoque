import React, { useState, useEffect } from "react";
import Navbar from '../../../components/navbars/header';
import HeaderPerfil from '../../../components/navbars/perfil';
import { AddCircleOutline, Edit, LocationOnOutlined, PhoneAndroid, Save, Search } from "@mui/icons-material";
import MenuMobile from "../../../components/menu-mobile";
import HeaderCadastro from "../../../components/navbars/cadastro";
import { InputAdornment, TextField } from "@mui/material";
import ButtonComponent from "../../../components/button";
import TableComponent from "../../../components/table";
import { headerUnidade } from "../../../entities/headers/header-cadastro/header-unidade";
import CentralModal from "../../../components/modal-central";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ArticleIcon from '@mui/icons-material/Article';
import ModalLateral from "../../../components/modal-lateral";
import { criarUnidade } from "../../../services/post/unidade";
import SelectTextFields from "../../../components/select";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { buscarCidades } from "../../../services/get/cidade";
import MaskedFieldPhone from "../../../utils/mascaras/telefone";
import MaskedField from "../../../utils/mascaras/cnpj";
import CustomToast from "../../../components/toast";
import { buscarUnidades } from "../../../services/get/unidade";
import { useNavigate } from "react-router-dom";
import { deletarUnidade } from "../../../services/delete/unidade";

const Unidades = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cidades, setCidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cadastro, setCadastro] = useState(false);
  const [editar, setEditar] = useState(false);
  const [unidadesCadastradas, setUnidadesCadastradas] = useState([]);
  const [cidadeMap, setCidadeMap] = useState({}); // New state for city mapping
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');

  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => {
    setCadastro(false);
    setNome('');
    setCnpj('');
    setTelefone('');
    setEndereco('');
    setCidade('');
  };

  const handleModalEditar = (unidade) => {
    console.log("Unidade sendo editada:", unidade);
  
    if (!unidade) {
      console.error("Unidade é undefined ou null");
      return;
    }
  
    // Mapeie o nome da cidade para o cidade_id usando o estado cidadeMap
    const cidadeId = Object.keys(cidadeMap).find(key => cidadeMap[key] === unidade.Cidade);
  
    if (!cidadeId) {
      CustomToast({ type: "error", message: "Cidade não encontrada. Por favor, verifique os dados da unidade." });
      return;
    }
  
    setUnidadeSelecionada({
      ...unidade,
      Estado: unidade.uf,
      Cidade: cidadeId, // Use o cidade_id mapeado
    });
  
    setEstado(unidade.uf);
    setCidadeSelecionada(cidadeId);
    setEditar(true);
  };
  const handleCloseModalEditar = () => setEditar(false);

  const handleCadastrar = async () => {
    try {
      await criarUnidade(nome, cnpj, telefone, endereco, cidade);
      CustomToast({ type: "success", message: "Unidade cadastrada com sucesso!" });
      buscarUnidadesCadastradas();
      handleCloseModalCadastro();
    } catch (error) {
      CustomToast({ type: "error", message: "Erro ao cadastrar unidade!" });
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

  const handleDeletarUnidade = async (unidade) => {
    console.log("Unidade a ser deletada:", unidade); // Verifique a estrutura do objeto
    const idUnidade = unidade.id; // Verifique se 'id' existe
    console.log("ID da unidade a ser deletada:", idUnidade); // Verifique o valor do ID
    try {
      await deletarUnidade(idUnidade);
      CustomToast({ type: "success", message: "Unidade deletada com sucesso!" });
      buscarUnidadesCadastradas();
    } catch (error) {
      console.error('Erro ao deletar unidade:', error.response);
      const errorMessage = error.response?.data?.message || "Erro ao deletar unidade.";
      CustomToast({ type: "error", message: errorMessage });
    }
  };

  const fetchData = async () => {
    try {
      const response = await buscarCidades();
      const cidadesData = response.data;
      const estadosData = [...new Set(cidadesData.map(c => c.uf))];
      setCidades(cidadesData);
      setEstados(estadosData);

      // Create a mapping of city IDs to city names
      const cityMapping = {};
      cidadesData.forEach(cidade => {
        cityMapping[cidade.id] = cidade.nome; // Assuming cidade.id is the ID and cidade.nome is the name
      });
      setCidadeMap(cityMapping); // Set the city mapping state
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    buscarUnidadesCadastradas();
    fetchData();
  }, []);

  return (
    <div className="flex gap-4 ">
      <Navbar />
      <div className='flex flex-col gap-2 w-full items-end'>
        <MenuMobile />
        <HeaderPerfil />
        <h1 className='flex gap-2 items-center justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start'>
          <LocationOnOutlined />Cadastro Unidades
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
                startIcon={<AddCircleOutline fontSize='small' />}
                title={'Cadastrar'}
                subtitle={'Cadastrar'}
                onClick={handleModalCadastro}
                buttonSize="large"
              />
            </div>
            <div className="w-[90%]">
              <TableComponent
                headers={headerUnidade}
                rows={unidadesCadastradas.map(unidade => ({
                  Nome: unidade.nome,
                  Cnpj: unidade.cnpj,
                  Telefone: unidade.telefone,
                  Cidade: unidade.cidade || 'Cidade não encontrada',
                  Endereco: unidade.endereco,
                  id: unidade.id // Certifique-se de que o ID está incluído
                }))}
                actionsLabel={"Ações"}
                actionCalls={{
                  edit: (unidade) => handleModalEditar(unidade),
                  delete: (unidade) => handleDeletarUnidade(unidade), // Certifique-se de que 'unidade' está correto aqui
                }}
              />
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
              title="Cadastrar Unidade"
            >
              <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
                <div className='mt-4 flex gap-3 flex-wrap'>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Nome da Unidade"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '45%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AssuredWorkloadIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <SelectTextFields
                    width={'100px'}
                    icon={<LocationCityIcon fontSize="small" />}
                    label={'Estado'}
                    backgroundColor={"#D9D9D9"}
                    fontWeight={500}
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    options={estados.map(estado => ({ value: estado, label: estado }))}
                  />
                  <SelectTextFields
                    width={'150px'}
                    icon={<AssuredWorkloadIcon fontSize="small" />}
                    label={'Cidade'}
                    backgroundColor={"#D9D9D9"}
                    fontWeight={500}
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    options={cidades.filter(c => c.uf === estado).map(cidade => ({ value: cidade.id, label: cidade.nome }))}
                  />
                  <MaskedField
                    type="cnpj"
                    label="CNPJ"
                    width={'50%'}
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    icon={<ArticleIcon />}
                    iconSize={30}
                    labelSize="small"
                  />
                  <MaskedFieldPhone
                    type="telefone"
                    label="Telefone"
                    width={'43%'}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    icon={<PhoneAndroid />}
                    iconSize={30}
                    labelSize="small"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Endereço"
                    name="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '95%' } }}
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeWorkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className='w-[95%] mt-2 flex items-end justify-end'>
                    <ButtonComponent
                      title={'Cadastrar'}
                      subtitle={'Cadastrar'}
                      startIcon={<Save />}
                      onClick={handleCadastrar}
                    />
                  </div>
                </div>
              </div>
            </CentralModal>

            <ModalLateral
  open={editar}
  handleClose={handleCloseModalEditar}
  tituloModal="Editar Unidade"
  icon={<Edit />}
  tamanhoTitulo="75%"
  conteudo={
    <div className="">
      <div className='mt-4 flex gap-3 flex-wrap'>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Nome da Unidade"
          name="nome"
          value={unidadeSelecionada ? unidadeSelecionada.Nome : ''}
          onChange={(e) => setUnidadeSelecionada({ ...unidadeSelecionada, Nome: e.target.value })}
          sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '100%' } }}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AssuredWorkloadIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="CNPJ"
          name="cnpj"
          value={unidadeSelecionada ? unidadeSelecionada.Cnpj : ''}
          onChange={(e) => setUnidadeSelecionada({ ...unidadeSelecionada, Cnpj: e.target.value })}
          sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '46%' } }}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ArticleIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Telefone"
          name="telefone"
          value={unidadeSelecionada ? unidadeSelecionada.Telefone : ''}
          onChange={(e) => setUnidadeSelecionada({ ...unidadeSelecionada, Telefone: e.target.value })}
          sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '49%' } }}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneAndroid />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Endereço"
          name="endereco"
          value={unidadeSelecionada ? unidadeSelecionada.Endereco : ''}
          onChange={(e) => setUnidadeSelecionada({ ...unidadeSelecionada, Endereco: e.target.value })}
          sx={{ width: { xs: '95%', sm: '50%', md: '40%', lg: '100%' } }}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeWorkIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Campo de Estado */}
        <SelectTextFields
          width={'140px'}
          icon={<LocationCityIcon fontSize="small" />}
          label={'Estado'}
          backgroundColor={"#D9D9D9"}
          fontWeight={500}
          value={unidadeSelecionada ? unidadeSelecionada.Estado : ''} // Use o estado da unidade selecionada
          onChange={(e) => {
            setUnidadeSelecionada({ ...unidadeSelecionada, Estado: e.target.value });
            setCidadeSelecionada(''); // Limpa a cidade selecionada ao mudar o estado
          }}
          options={estados.map(estado => ({ value: estado, label: estado }))}
        />
        {/* Campo de Cidade */}
        <SelectTextFields
          width={'150px'}
          icon={<AssuredWorkloadIcon fontSize="small" />}
          label={'Cidade'}
          backgroundColor={"#D9D9D9"}
          fontWeight={500}
          value={cidadeSelecionada || unidadeSelecionada?.Cidade || ''} // Use a cidade selecionada ou a cidade da unidade
          onChange={(e) => {
            setUnidadeSelecionada({ ...unidadeSelecionada, Cidade: e.target.value });
            setCidadeSelecionada(e.target.value); // Atualiza a cidade selecionada
          }}
          options={cidades
            .filter(c => c.uf === (unidadeSelecionada?.Estado || estado)) // Filtra as cidades pelo estado selecionado
            .map(cidade => ({ value: cidade.id.toString(), label: cidade.nome }))}
        />
      </div>
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
        </div>
      </div>
    </div>
  );
};

export default Unidades;