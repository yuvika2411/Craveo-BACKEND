import React from 'react';
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../State/Authentication/Action';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  role: 'ROLE_CUSTOMER'
};

const inputStyle = {
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

export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch= useDispatch();

    const handleSubmit = (values) => {
        console.log("register form values", values)
        dispatch(registerUser({ userData: values, navigate }));
    }
    
    return (
        <div>
            <Typography variant="h5" className="text-center" sx={{mb: 3, fontWeight: "500", fontSize: "1.5rem" }}>
                Register
            </Typography>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                <Form className="flex flex-col gap-4">
                    <Field 
                        as={TextField}
                        name="fullName"
                        label="Full Name"
                        fullWidth
                        variant="outlined"
                        sx={inputStyle}
                    />
                    <Field 
                        as={TextField}
                        name="email"
                        label="Email Address"
                        fullWidth
                        variant="outlined"
                        sx={inputStyle}
                    />
                    <Field 
                        as={TextField}
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        sx={inputStyle}
                    />
                    <FormControl fullWidth sx={inputStyle}>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            name="role"
                            value={values.role}
                            label="Role"
                            onChange={handleChange}
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                        </Select>
                    </FormControl>
                    <Button sx={{ mt: 2, padding: "1rem", backgroundColor: "#ea580c", color: "white", "&:hover": { backgroundColor: "#c2410c" }, borderRadius: "8px" }} fullWidth type="submit" variant="contained">
                        REGISTER
                    </Button>
                </Form>
                )}
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
                Sign up with Google
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 3, color: "gray" }}>
                Already have an account? 
                <Button size="small" onClick={() => navigate('/account/login')} sx={{ ml: 1, color: "#ea580c", fontWeight: 'bold' }}>
                    LOGIN
                </Button>
            </Typography>
        </div>
    )
}

export default RegisterForm;
