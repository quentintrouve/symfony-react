import React, { useState, useEffect } from 'react';
import { getPosts } from '../utils/methods';

import NavBar from '../components/NavBar';
import PostForm from '../components/PostForm'
import PostList from '../components/PostList';
import { 
  Container, 
  CssBaseline, 
  CircularProgress, 
  Box, 
  Alert 
} from '@mui/material';

import { 
  createTheme, 
  ThemeProvider 
} from '@mui/material/styles';

const theme = createTheme();


export default function Posts({ setPage, userData, setUserData }) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postList, setPostList] = useState(null);
  const [newPost, setNewPost] = useState(null);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);

    getPosts(isActive, setIsLoading, setPostList, setError)

    return () => {
      isActive = false;
    }
  }, [newPost])

  return (
    <div>
      <NavBar userName={userData.name} setUserData={setUserData}/>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <PostForm userData={userData} setNewPost={setNewPost}  />

          {error &&
            <Alert sx={{mt: 4}} severity={error.type}>{error.message}</Alert>
          }

          {isLoading ? 
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4
              }}
            >
              <CircularProgress />
            </Box>
          :
            <PostList postList={postList} />
          }
        </Container>
      </ThemeProvider>
    </div>
  )
}
