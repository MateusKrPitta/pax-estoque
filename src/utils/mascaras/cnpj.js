import React from "react";
import MaskedInput from "react-text-mask";
import { TextField, InputAdornment } from "@mui/material";
import { Icon } from '@mui/material';

const MaskedField = ({ 
  type, 
  label, 
  value, 
  onChange, 
  icon, 
  iconSize = 24, 
  labelSize = 'medium', 
  width = width // Propriedade width com valor padrão
}) => {
  // Definindo as máscaras para CNPJ e telefone
  const mask = type === "cnpj" 
    ? [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
    : ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]; // Máscara para telefone

  return (
    <MaskedInput
      mask={mask}
      value={value}
      onChange={onChange}
      render={(ref, props) => (
        <TextField
          {...props}
          inputRef={ref}
          variant="outlined"
          size="small"
          fullWidth
          label={label}
          InputLabelProps={{
            shrink: true,
            style: { fontSize: labelSize === 'small' ? '0.75rem' : '1rem' }
          }}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position="start">
                <Icon style={{ fontSize: iconSize }}>{icon}</Icon>
              </InputAdornment>
            ) : null,
          }}
          sx={{ width }} // Aplicando a propriedade width
        />
      )}
    />
  );
};

export default MaskedField;