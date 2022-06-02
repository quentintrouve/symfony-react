import { useState } from 'react';
import { connexion } from '../utils/methods';

import {
  Link,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Alert
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import { 
  createTheme, 
  ThemeProvider 
} from '@mui/material/styles';


const theme = createTheme();


const Login = ({setPage, setUserData, registerMessage, setRegisterMessage}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setRegisterMessage(null);

    const data = new FormData(event.currentTarget);

    let email = data.get('email');
    let password = data.get('password');

    if(email?.length > 0 && password?.length > 0) {
      data.append("email", email);
      data.append("password", password);  
    } else {
      setError({
        type: "warning", 
        message: "Vous devez renseigner un email et un mot de passe afin de vous connectez."
      })
      return;
    }

    let isActive = true;
    setIsLoading(true);

    connexion(
      data,
      isActive, 
      setIsLoading, 
      setPage, 
      setUserData, 
      setError
    );

    return () => {
      isActive = false;
    }
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
          {registerMessage ? 
            <Alert severity="success">{registerMessage}</Alert>
          : null}

          <Typography component="h1" variant="h5" sx={{mt: 4}}>
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {error ?
              <Alert severity={error.type}>{error.message}</Alert>
            : null}

            
              <Box 
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  loading={isLoading}
                >
                  Connexion
                </LoadingButton>

                {!isLoading ? 
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                      setPage("register");
                    }}
                  >
                    Pas encore inscrit ? Inscription
                  </Link>
                : null }
              </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;

