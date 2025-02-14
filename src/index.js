import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#006b33',
    },
    // Adicionando uma cor personalizada dentro da paleta
    customGray: {
      main: '#d9d9d9',
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 12, // Define o tamanho da fonte padrão
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontSize: '12px', // Define o tamanho da fonte para os inputs
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
