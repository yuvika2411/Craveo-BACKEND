import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

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

    const handleSubmit = (values) => {
        console.log("login form values", values)
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
