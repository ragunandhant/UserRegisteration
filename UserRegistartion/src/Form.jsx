// Form.js
import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Input,
    Button,
    Checkbox,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    CssBaseline,
} from '@mui/material';
import './Form.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        isHosteller: false,
        rollNo: '',
        password: '',
        confirmPassword: '', // New state variable for confirmation password
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name === "") {
            toast.error('Please enter a valid User Name');
            return;
        }
        if (!formData.email.includes("sece.ac.in")) {
            toast.error("Provide a valid Sece Email Id");
            return;
        }
        if (formData.gender === '') {
            toast.error("Please select a gender");
            return;
        }
        if (formData.rollNo === '') {
            toast.error("Please select a valid Roll Number");
            return;
        }
        if (formData.password === '') {
            toast.error("Password cannot be empty");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        console.log('Form submitted:', formData);
        const data = {
            User_name: formData.email,
            password: formData.password,
            gender: formData.gender === 'male' ? 1 : 0,
            isHosteller: formData.isHosteller ? 1 : 0,
            rollNo: formData.rollNo,
            name: formData.name
        };

        try {
            const res = await axios.post("http://localhost:4000/auth/register", { ...data });

            if (res.status === 200) {
                toast.error("User name already exists"); return
            }
            else if (res.status === 202) {
                toast.error("Roll Number already exists"); return
            }
            else {
                toast.success("User created successfully");
            }

            setFormData({
                name: '',
                email: '',
                gender: '',
                isHosteller: false,
                rollNo: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form");
        }
    };

    return (
        <Container component="main" maxWidth="sm" className="center">
            <CssBaseline />
            <Paper elevation={3} className="form-container">
                <Typography variant="h4" component="div" gutterBottom>
                    BillBuddy Registration
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="input-field"
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Checkbox
                                id="isHosteller"
                                name="isHosteller"
                                checked={formData.isHosteller}
                                onChange={handleInputChange}
                            />
                        }
                        label="Hosteller"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="rollNo">Roll Number</InputLabel>
                        <Input
                            id="rollNo"
                            name="rollNo"
                            type="text"
                            value={formData.rollNo}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Box display="flex" alignItems="center">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                className="input-field"
                                style={{ width: "100%" }}
                            />
                            <Button
                                type="button"
                                onClick={handlePasswordToggle}
                                className="password-toggle"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </Box>
                    </FormControl>

                    {/* Confirmation Password Field */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Form;
