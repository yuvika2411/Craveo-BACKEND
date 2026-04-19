import React from 'react';
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

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

    const handleSubmit = (values) => {
        console.log("register form values", values)
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
