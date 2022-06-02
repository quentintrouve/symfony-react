import { useState } from 'react';
import { register } from '../utils/methods';

import {
	Link,
	CssBaseline,
	Box,
	Typography,
	Container,
	Alert,
	TextField
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import { 
	createTheme, 
	ThemeProvider 
} from '@mui/material/styles';


const theme = createTheme();


const Register = ({setPage, setRegisterMessage}) => {

    const [isLoading, setIsLoading] = useState(false);
		const [error, setError] = useState(null);

    const handleSubmit = (event) => {
			event.preventDefault();

			const data = new FormData(event.currentTarget);

			let name = data.get('name');
			let email = data.get('email');
			let password = data.get('password');

			if(name?.length > 0 && email?.length > 0 && password.length > 0) {
				data.append("name", name);
				data.append("email", email);
				data.append("password", password);
			} else {
				setError({
					type: "warning", 
					message: "Vous devez remplir tous les champs afin de vous créer un compte."
				})
				return;
			}

			let isActive = true;
			setIsLoading(true);

			register(
				data,
				isActive,
				setIsLoading,
				setPage,
				setRegisterMessage,
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
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="User name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            />

						{error &&
              <Alert severity={error.type}>{error.message}</Alert>
            }

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
								Inscription
							</LoadingButton>
						
							{!isLoading ? 
								<Link
									component="button"
									variant="body2"
									onClick={() => {
										setPage("login");
									}}
								>
									Déjà un compte ? Connexion
								</Link>
							: null }
						</Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;

