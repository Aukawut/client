import React,{useState} from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
function Copyright(props) {
    
    
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        F_Dev.com
      </Link>{' '}
      {new Date().getFullYear()}
   
    </Typography>
  );
}

const theme = createTheme();


export default function SignIn() {
    const navigate = useNavigate();
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const resetForm = () => {
        setUsername("")
        setPassword("")
    }
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://upset-seal-scarf.cyclic.app/login',{username:username,password:password}).then((res) => {
       if(res.data.err && res.data.msg == 'username not found'){
        Swal.fire({
            icon:'error',
            title:'username not found!'
        })
       }
       else if(res.data.err && res.data.msg == 'password invalid'){
        Swal.fire({
            icon:'error',
            title:'Password invalid!'
        })
       }else{
        localStorage.setItem("token",res.data.token)
        Swal.fire({
            icon:'success',
            title:'Success!',
            timer:1500
        }).then(() => {
            navigate("/")
        })
       }
      
       console.log(res.data);
        // if(res.data.msg)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            
       
            </Button>
            <Button
           
              fullWidth
              variant="outlined"
              sx={{ mt: 0, mb: 2 }}
              onClick={resetForm}
            >
              Reset
            
       
            </Button>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}