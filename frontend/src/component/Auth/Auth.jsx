import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    borderRadius: '12px'
};

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === "/account/login";
    const isRegister = location.pathname === "/account/register";
    const isOpen = isLogin || isRegister;

    // ✅ BETTER CLOSE (go back instead of forcing home)
    const handleOnClose = () => {
        navigate(-1);
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleOnClose}
            sx={{
                backdropFilter: 'blur(4px)'
            }}
        >
            <Box sx={style}>

                <IconButton
                    onClick={handleOnClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {isRegister ? <RegisterForm /> : <LoginForm />}
            </Box>
        </Modal>
    );
};

export default Auth;