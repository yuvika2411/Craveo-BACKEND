import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: '12px'
};

export const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOnClose = () => {
        navigate("/")
    }

    const isOpen = location.pathname === "/account/login" || location.pathname === "/account/register";

    return (
        <Modal 
            open={isOpen} 
            onClose={handleOnClose}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.85)'
                    }
                }
            }}
        >
            <Box sx={style}>
                 <IconButton
                  aria-label="close"
                  onClick={handleOnClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                {location.pathname === "/account/register" ? <RegisterForm/> : <LoginForm/>}
            </Box>
        </Modal>
    )
}

export default Auth;
