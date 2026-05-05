import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../State/Authentication/Action';

const initialValues = {
  email: '',
  password: ''
};

const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#ea580c',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ea580c',
        },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#ea580c',
    },
};

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(loginUser({userData:values,navigate}));
        // console.log("login form values", values)
    }

    return (
        <div>
            <Typography variant="h5" className="text-center" sx={{mb: 3, fontWeight: "500", fontSize: "1.5rem" }}>
                Login
            </Typography>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="flex flex-col gap-4">
                    <Field 
                        as={TextField}
                        name="email"
                        label="Email Address"
                        fullWidth
                        variant="outlined"
                        sx={textFieldStyle}
                    />
                    <Field 
                        as={TextField}
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        sx={textFieldStyle}
                    />
                    <Button sx={{ mt: 2, padding: "1rem", backgroundColor: "#ea580c", color: "white", "&:hover": { backgroundColor: "#c2410c" }, borderRadius: "8px" }} fullWidth type="submit" variant="contained">
                        LOGIN
                    </Button>
                </Form>
            </Formik>

            <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-600"></div>
                <span className="px-3 text-gray-500 text-sm">OR</span>
                <div className="flex-1 border-t border-gray-600"></div>
            </div>

            <Button 
                fullWidth 
                variant="outlined" 
                sx={{ 
                    padding: "0.8rem", 
                    color: "white", 
                    borderColor: "gray", 
                    "&:hover": { borderColor: "white", backgroundColor: "rgba(255,255,255,0.05)" }, 
                    borderRadius: "8px",
                    display: "flex",
                    gap: "10px"
                }}
                onClick={() => alert("Google Authentication will be enabled after configuring OAuth Client ID.")}
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
                Sign in with Google
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 3, color: "gray" }}>
                Don't have an account? 
                <Button size="small" onClick={() => navigate('/account/register')} sx={{ ml: 1, color: "#ea580c", fontWeight: 'bold' }}>
                    REGISTER
                </Button>
            </Typography>
        </div>
    )
}

export default LoginForm;