import React from 'react'
import {
	Box,
	Typography,
	Paper
} from '@mui/material';


const PostList = ({ postList}) => {
    
    return (
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
    >
			<Typography component="h2" variant="h5" style={{marginBottom: '32px'}}>
				Liste des posts
			</Typography>

			<section style={{display: 'flex', flexDirection: 'column'}}>
				{postList && postList.map((post, index) => (
					<Paper elevation={3} key={index} style={{marginBottom: '24px'}}>
						<article style={{margin: '24px'}}>
						<h3>{post.title}</h3>
						<p>Créateur : {post.creator_name}</p>
						<p>{post.content}</p>
					</article>
					</Paper>
				))}
			</section>
    </Box>
    )
}

export default PostList;
