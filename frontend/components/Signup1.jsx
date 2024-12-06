import { Box, Button, FormControl, InputLabel, MenuItem, Select, styled, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import NcasLogo from '../images/ncaslogo.png';
import SignUpImage from '../images/add-user_9977205.png';
import axios from 'axios';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const Signup1 = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    
    const inputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const ImgBg = styled('img')(({ theme }) => ({
        width: '175px',
        [theme.breakpoints.down('sm')]: {
            width: '100px',
        },
    }));

    const CustomTypo = styled(Typography)(({ theme }) => ({
        fontFamily: 'SUSE',
        lineHeight: 1.5,
        fontSize: '50px',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '32px',
        },
    }));

    const [sem, setSem] = useState('');
    const [course, setCourse] = useState('');

    const handleChangeSem = (event) => {
        setSem(event.target.value);
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const handleChangeCourse = (event) => {
        setCourse(event.target.value);
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const submitHandler = async () => {
        // Check if all fields are filled
        if (!input.name || !input.email || !input.sem || !input.course || !input.password || !input.cpassword) {
            setErrorMessage('All fields are required');
            return;
        }

        // Check if password is at least 8 characters
        if (input.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters');
            return;
        }

        // Check if email format is valid
        if (!validateEmail(input.email)) {
            setErrorMessage('Invalid email format');
            return;
        }

        // Check if passwords match
        if (input.password !== input.cpassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/signup", input);
            alert(res.data.message);
            setErrorMessage('');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message === 'Email already registered'
                    ? 'Email already registered'
                    : 'An error occurred. Please try again.');
            } else {
                setErrorMessage('Email already registered');
            }
        }
    };

    return (
        <div class="bgi">
            <Box sx={{ width: { xs: '100%', sm: '80%', md: 600 }, margin: 'auto', textAlign: 'center', justifyContent: 'center', marginTop: { xs: '50px', md: '100px' }, padding: { xs: '0 20px', sm: '0' } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'center', md: 'space-around' } }}>
                    <Box sx={{ minWidth: { xs: '100%', md: 300 }, backgroundColor: '#f57c00', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: '20px', md: '0' } }}>
                        <ImgBg src={NcasLogo} alt="NCAS Logo" />
                    </Box>
                    <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px', width: { xs: '100%', md: 'auto' }, textAlign: 'center' }}>
                        <img src={SignUpImage} alt="Sign Up" style={{ width: '50px', height: '50px' }} />
                        <CustomTypo variant="h4">SIGN UP</CustomTypo>
                        <Box>
                            {errorMessage && (
                                <Typography color="error" variant="body2" sx={{ marginBottom: '10px' }}>
                                    {errorMessage}
                                </Typography>
                            )}
                            <TextField label="Name" variant="outlined" name="name" onChange={inputHandler} sx={{ paddingBottom: '10px', width: '100%' }} />
                            <TextField label="Email" variant="outlined" name="email" onChange={inputHandler} sx={{ paddingBottom: '10px', width: '100%' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormControl sx={{ minWidth: 110, m: 1, width: '48%' }}>
                                    <InputLabel id="sem-select-label">SEM</InputLabel>
                                    <Select labelId="sem-select-label" id="sem-select" value={sem} label="SEM" name="sem" onChange={handleChangeSem}>
                                        <MenuItem value={1}>S1</MenuItem>
                                        <MenuItem value={2}>S2</MenuItem>
                                        <MenuItem value={3}>S3</MenuItem>
                                        <MenuItem value={4}>S4</MenuItem>
                                        <MenuItem value={5}>S5</MenuItem>
                                        <MenuItem value={6}>S6</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ minWidth: 110, m: 1, width: '48%' }}>
                                    <InputLabel id="course-select-label">COURSE</InputLabel>
                                    <Select labelId="course-select-label" id="course-select" value={course} label="COURSE" name="course" onChange={handleChangeCourse}>
                                        <MenuItem value={"bca"}>BCA</MenuItem>
                                        <MenuItem value={"bsccs"}>BSc CS</MenuItem>
                                        <MenuItem value={"bscit"}>BSc IT</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField label="Password" variant="outlined" name="password" type="password" onChange={inputHandler} sx={{ paddingBottom: '10px', width: '100%' }} />
                            <TextField label="Confirm Password" variant="outlined" name="cpassword" type="password" onChange={inputHandler} sx={{ paddingBottom: '10px', width: '100%' }} />
                            <Button variant="contained" sx={{ backgroundColor: '#000000', width: '100%', marginTop: '10px' }} onClick={submitHandler}>
                                Sign Up
                            </Button>
                        </Box>
                        <Typography variant="body1" marginTop="20px">
                            Already a Member? <Link href="/">Login</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Signup1;
