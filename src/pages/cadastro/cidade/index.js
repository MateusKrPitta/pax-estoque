import { useEffect, useState } from "react";
import Navbar from '../../../components/navbars/header';
import HeaderPerfil from '../../../components/navbars/perfil';
import { AddCircleOutline, Edit, LocationOnOutlined, PhoneAndroid, Save, Search } from "@mui/icons-material";
import MenuMobile from "../../../components/menu-mobile";
import HeaderCadastro from "../../../components/navbars/cadastro";
import { InputAdornment, TextField } from "@mui/material";
import ButtonComponent from "../../../components/button";
import TableComponent from "../../../components/table";
import CentralModal from "../../../components/modal-central";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ModalLateral from "../../../components/modal-lateral";
import { headerCidade } from "../../../entities/headers/header-cadastro/header-cidade";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SelectTextFields from "../../../components/select";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { criarCidade } from "../../../services/post/cidade";
import { buscarCidades } from "../../../services/get/cidade"; // Certifique-se de que o caminho está correto
import { deletarCidade } from "../../../services/delete/cidade";
import CustomToast from "../../../components/toast";
import { atualizarCidade } from "../../../services/put/cidade";

const Cidade = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [cadastro, setCadastro] = useState(false);
  const [editar, setEditar] = useState(false);
  const [cidadesCadastradas, setCidadesCadastradas] = useState([]);
  const [cidadeEditada, setCidadeEditada] = useState(null);
  const handleModalCadastro = () => setCadastro(true);
  const handleCloseModalCadastro = () => setCadastro(false);

  const handleModalEditar = async (cidade) => {
    console.log("Cidade a ser editada:", cidade);
    setCidadeEditada(cidade);
    setEstadoSelecionado(cidade.uf);
    setEditar(true);

    try {
      const response = await buscarCidades(); // Agora pegamos as cidades da sua API
      console.log("Cidades carregadas da API:", response.data);
      setCidades(response.data);

      // Buscar a cidade pelo ID para garantir que o select a reconheça
      const cidadeEncontrada = response.data.find(c => c.id === cidade.id);

      if (cidadeEncontrada) {
        setCidadeSelecionada(cidadeEncontrada.id);
      } else {
        setCidadeSelecionada('');
      }
    } catch (error) {
      console.error("Erro ao buscar cidades cadastradas:", error);
    }
  };


  // Adicione este log no render
  console.log("Cidade selecionada:", cidadeSelecionada);



  const handleCloseModalEditar = () => setEditar(false);

  useEffect(() => {
    // Buscar estados ao carregar a página
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const estadosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setEstados(estadosOrdenados);
      })
      .catch(error => {
        console.error("Erro ao buscar estados:", error);
      });
  }, []);

  const buscarCidadesPorEstado = (uf) => {
    setEstadoSelecionado(uf);
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then(response => {
        setCidades(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar cidades:", error);
      });
  };

  const handleCadastrarCidade = async () => {
    if (!cidadeSelecionada || !estadoSelecionado) {
      CustomToast({ type: "alert", message: "Por favor, selecione uma cidade e um estado." });
      return;
    }

    const cidadeSelecionadaObj = cidades.find(cidade => cidade.id === cidadeSelecionada);
    const nomeCidade = cidadeSelecionadaObj ? cidadeSelecionadaObj.nome : '';

    const token = localStorage.getItem('token');

    try {
      const response = await criarCidade(nomeCidade, estadoSelecionado, token);
      CustomToast({ type: "success", message: "Cidade cadastrada com sucesso!" });
      handleCloseModalCadastro();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao cadastrar cidade.";
      CustomToast({ type: "error", message: errorMessage });
      console.error('Erro ao cadastrar cidade:', error);
    }
  };

  const buscarCidadesCadastradas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redireciona para a página de login se não houver token
      CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." }); // Exibe o toast
      return;
    }

    try {
      const response = await buscarCidades(); // Chama a função que busca as cidades
      console.log('Dados das cidades cadastradas:', response); // Adiciona log para verificar os dados
      setCidadesCadastradas(response.data); // Atualiza o estado com os dados retornados
    } catch (error) {
      if (error.response && error.response.status === 401) {
        CustomToast({ type: "error", message: "A sessão expirou. Por favor, faça login novamente." }); // Exibe o toast
        navigate('/'); // Redireciona para a página de login
      } else {
        console.error("Erro ao buscar cidades cadastradas:", error);
      }
    }
  };

  const handleDeletarCidade = async (cidade) => {
    const idCidade = cidade.id;
    try {
      await deletarCidade(idCidade);
      CustomToast({ type: "success", message: "Cidade deletada com sucesso!" });
      buscarCidadesCadastradas();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao deletar cidade.";
      CustomToast({ type: "error", message: 'Você não possui permissão para excluir!' });
      console.error('Erro ao deletar cidade:', error);
    }
  };

  const handleSalvarEdicao = async () => {
    if (!cidadeSelecionada || !estadoSelecionado) {
      CustomToast({ type: "alert", message: "Por favor, selecione uma cidade e um estado." });
      return;
    }

    const cidadeSelecionadaObj = cidades.find(cidade => cidade.id === cidadeSelecionada);
    const nomeCidade = cidadeSelecionadaObj ? cidadeSelecionadaObj.nome : '';

    try {
      await atualizarCidade(cidadeEditada.id, nomeCidade, estadoSelecionado); // Chama a função de atualização
      CustomToast({ type: "success", message: "Cidade atualizada com sucesso!" });
      handleCloseModalEditar(); // Fecha o modal de edição
      buscarCidadesCadastradas(); // Atualiza a lista de cidades cadastradas
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao atualizar cidade.";
      CustomToast({ type: "error", message: errorMessage });
      console.error('Erro ao atualizar cidade:', error);
    }
  };


  useEffect(() => {
    if (cidadeEditada && cidades.length > 0) {
      setCidadeSelecionada(cidadeEditada.id);
    }
  }, [cidades, cidadeEditada]);

  useEffect(() => {
    buscarCidadesCadastradas(); // Chama a função ao montar o componente
  }, []); // Certifique-se de que o array de dependências está vazio

  return (
    <div className="flex gap-4 ">
      <Navbar />
      <div className='flex flex-col gap-2 w-full items-end'>
        <MenuMobile />
        <HeaderPerfil />
        <h1 className='flex gap-2 items-center justify-center text-base sm:ml-1  md:text-2xl  font-bold text-primary w-full md:justify-start   '><LocationCityIcon />Cadastro Cidades</h1>
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
                label="Buscar Cidade"
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
            <TableComponent
              headers={headerCidade}
              rows={cidadesCadastradas.map(cidade => ({
                id: cidade.id,
                nome: cidade.nome,
                uf: cidade.uf,
              }))} // Mapeia os dados para o formato esperado pela tabela
              actionsLabel={"Ações"}
              actionCalls={{
                edit: handleModalEditar,
                delete: (cidade) => handleDeletarCidade(cidade), // Passando o objeto cidade
              }}
            />

            <CentralModal
              tamanhoTitulo={'81%'}
              maxHeight={'90vh'}
              top={'20%'}
              left={'28%'}
              width={'600px'}
              icon={<AddCircleOutline fontSize="small" />}
              open={cadastro}
              onClose={handleCloseModalCadastro}
              title="Cadastrar Cidade"
            >
              <div className="overflow-y-auto overflow-x-hidden max-h-[300px]">
                <div className='mt-4 flex gap-3 flex-wrap'>
                  <SelectTextFields
                    width={'250px'}
                    icon={<LocationCityIcon fontSize="small" />}
                    label={'Estado'}
                    backgroundColor={"#D9D9D9"}
                    fontWeight={500}
                    value={estadoSelecionado}
                    onChange={(e) => {
                      const uf = e.target.value;
                      buscarCidadesPorEstado(uf);
                      setEstadoSelecionado(uf);
                    }}
                    options={estados && estados.length > 0 ? estados.map(estado => ({
                      value: estado.sigla,
                      label: estado.sigla
                    })) : []} // Verificação para evitar erro
                  />
                  <SelectTextFields
                    width={'250px'}
                    icon={<AssuredWorkloadIcon fontSize="small" />}
                    label={'Cidade'}
                    backgroundColor={"#D9D9D9"}
                    fontWeight={500}
                    value={cidadeSelecionada}
                    onChange={(e) => setCidadeSelecionada(e.target.value)}
                    options={cidades && cidades.length > 0 ? cidades.map(cidade => ({
                      value: cidade.id,
                      label: cidade.nome
                    })) : []} // Verificação para evitar erro
                  />
                  <div className='w-[95%] mt-2 flex items-end justify-end'>
                    <ButtonComponent
                      title={'Cadastrar'}
                      subtitle={'Cadastrar'}
                      startIcon={<Save />}
                      onClick={handleCadastrarCidade}
                    />
                  </div>
                </div>
              </div>
            </CentralModal>

            <ModalLateral
              open={editar}
              handleClose={handleCloseModalEditar}
              tituloModal="Editar Cidade"
              icon={<Edit />}
              tamanhoTitulo="75%"
              conteudo={
                <div className="">
                  <div className='mt-4 flex gap-3 flex-wrap'>
                    <SelectTextFields
                      width={'100px'}
                      icon={<LocationCityIcon fontSize="small" />}
                      label={'Estado'}
                      backgroundColor={"#D9D9D9"}
                      fontWeight={500}
                      value={estadoSelecionado}
                      onChange={(e) => {
                        const uf = e.target.value;
                        buscarCidadesPorEstado(uf);
                        setEstadoSelecionado(uf);
                        setCidadeSelecionada(''); // Limpa a cidade selecionada ao mudar o estado
                      }}
                      options={estados && estados.length > 0 ? estados.map(estado => ({
                        value: estado.sigla,
                        label: estado.sigla
                      })) : []}
                    />
                    <SelectTextFields
                      width={'190px'}
                      icon={<AssuredWorkloadIcon fontSize="small" />}
                      label={'Cidade'}
                      backgroundColor={"#D9D9D9"}
                      fontWeight={500}
                      value={cidadeSelecionada}
                      onChange={(e) => setCidadeSelecionada(e.target.value)}
                      options={cidades.length > 0 ? cidades.map(cidade => ({
                        value: cidade.id,  // Agora pegamos o ID da sua API
                        label: cidade.nome
                      })) : []}
                    />

                  </div>
                  <div className='w-[95%] mt-2 flex items-end justify-end'>
                    <ButtonComponent
                      title={'Salvar'}
                      subtitle={'Salvar'}
                      startIcon={<Save />}
                      onClick={handleSalvarEdicao} // Chama a função de salvar
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
}

export default Cidade;