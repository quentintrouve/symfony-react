import { useState, useRef } from 'react';
import { addPost, getPosts } from '../utils/methods';

import { 
	Alert,
	Typography,
	Box,
	TextField,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';



const PostForm = ({ userData, setNewPost }) => {

	const titleRef = useRef();
	const contentRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)


  const handleSubmit = (event) => {
    event.preventDefault();

    setError(null);
		setNewPost(null);

    const data = new FormData(event.currentTarget);

    let title = data.get('title');
    let content = data.get('content');

    if(title?.length > 0 && content?.length > 0) {
			data.append("title", title);
			data.append("content", content);
			data.append("creator_id", userData.id);
    } else {
      setError({
				type: "warning", 
				message: "Vous devez remplir un titre et un contenu pour votre post."
			})
			return;
    }

		let isActive = true;
    setIsLoading(true);

		addPost(
			data,
			userData.name,
			isActive,
			titleRef,
			contentRef,
			setIsLoading,
			setNewPost,
			setError
		)

		return () => {
			isActive = false
		}
  };

  return (   
    <Box
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
    >
			<Typography component="h1" variant="h5">
				Ajouter un nouveau post
			</Typography>

			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					inputRef={titleRef}
					margin="normal"
					required
					fullWidth
					id="title"
					label="Titre du post"
					name="title"
					autoComplete="title"
					autoFocus
				/>
				<TextField
					inputRef={contentRef}
					margin="normal"
					required
					fullWidth
					name="content"
					label="Contenu du post"
					type="text"
					id="content"
					autoComplete="content"
					multiline
					minRows={5}
				/>

				{error ?
					<Alert severity={error.type}>{error.message}</Alert>
				: null}

				<LoadingButton
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					loading={isLoading}
				>
					Créer votre post
				</LoadingButton>
			</Box>
    </Box>
  );
}

export default PostForm;
