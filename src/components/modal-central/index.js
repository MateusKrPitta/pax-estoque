import React from "react";
import { Modal, Box, Typography, Button, Grow } from "@mui/material";
import Lines from "../lines";

//icones
import Label from "../label";
import ButtonClose from "../buttons/button-close";

const CentralModal = ({ open, onClose, title, children, icon, width, top, left, maxHeight, tamanhoTitulo }) => {
    return (
        <Modal
            style={{ padding: 20 }}
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropProps={{
                timeout: 500,
            }}
            aria-labelledby="central-modal-title"
            aria-describedby="central-modal-description"
        >
            <Grow in={open} style={{ transformOrigin: "top center" }}>
                <Box
                    sx={{
                        position: "absolute",
                        top: { xs: '10%', sm: top || '20%' }, // Ajuste para telas menores
                        left: { xs: '5%', sm: left || '28%' }, // Ajuste para telas menores
                        maxHeight: maxHeight,
                        overflowY: 'auto',
                        transform: "translate(-50%, -50%)",
                        width: { xs: '90%', sm: width || '450px' }, // Ajuste para telas menores
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        id="central-modal-title"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >
                        <Lines gap={'5px'} conteudo={<>
                            <Lines width={'5%'} alignItems={'center'} justifyContent={'center'} padding={'5px'} backgroundColor={'#006b33'} borderRadius={'5px'} color={'#ffff'} conteudo={<>{icon}</>} />
                            <Label fontWeight={700} width={tamanhoTitulo || '75%'} fontSize={'15px'} conteudo={<>{title}</>} />
                            <ButtonClose width={'10%'} display={'flex'} alignItems={'end'} justifyContent={'end'} funcao={onClose} />
                        </>}></Lines>
                    </Typography>
                    <Typography id="central-modal-description" sx={{ mb: 2 }}>
                        {children}
                    </Typography>
                </Box>
            </Grow>
        </Modal>
    );
};

export default CentralModal;
