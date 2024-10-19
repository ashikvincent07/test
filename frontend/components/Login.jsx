import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import React, { useState } from 'react';
import NcasLogo from '../images/ncaslogo.png';
import SignUpImage from '../images/add-user_9977205.png';
import axios from 'axios';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store error messages
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            
            console.log("Response from server:", response);

            if (response.data && response.data.userId) {
                const role = response.data.role; // Access the role from the response object

                // Check user role and navigate accordingly
                if (role === 'user') {
                    navigate('/home'); // Navigate to user home page
                } else if (role === 'admin') {
                    navigate('/admin'); // Navigate to admin dashboard
                }
            } else {
                setError('Invalid response structure');
            }
            localStorage.setItem('userId', response.data.userId);
        } catch (error) {
            // Handle error responses from the backend
            if (error.response && error.response.status === 404) {
                setError('User not found');
            } else if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <Box sx={{
                width: { xs: '100%', sm: '80%', md: 600 },
                margin: 'auto',
                textAlign: 'center',
                justifyContent: 'center',
                marginTop: { xs: '50px', md: '100px' },
                padding: { xs: '0 20px', sm: '0' },
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'space-around' },
                    flexDirection: { xs: 'column', md: 'row' },
                }}>
                    <Box sx={{
                        minWidth: { xs: '100%', md: 300 },
                        backgroundColor: '#f57c00',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: { xs: '20px', md: '0' },
                    }}>
                        <img src={NcasLogo} alt="NCAS Logo" style={{ width: '175px' }} />
                    </Box>

                    <Box sx={{
                        backgroundColor: '#f5f5f5',
                        padding: '20px',
                        width: { xs: '100%', md: 'auto' },
                        textAlign: 'center',
                    }}>
                        <img src={SignUpImage} alt="Sign Up Icon" style={{ width: '50px', height: '50px' }} />
                        <Typography variant='h4' sx={{ fontFamily: 'SUSE', lineHeight: 1.5, fontSize: '50px', marginBottom: '20px' }}>
                            LOGIN
                        </Typography>

                        {error && <Alert severity="error">{error}</Alert>} {/* Display error messages */}

                        <Box>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ paddingBottom: '10px' }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ paddingBottom: '10px' }}
                            />
                            <Button
                                variant='contained'
                                fullWidth
                                onClick={handleLogin}
                                sx={{ backgroundColor: '#000000', marginTop: '10px' }}
                            >
                                Login
                            </Button>
                        </Box>
                        <Typography variant="body1" marginTop="20px">
                            Not a Member? <Link href="/signup">Signup</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default Login;
