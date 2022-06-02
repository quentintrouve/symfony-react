import React from 'react'
import { Button, Box } from '@mui/material';
import { capitalizeFirstLetter } from '../utils/stringUtils'

export default function NavBar({ userName, setUserData }) {

	return (
		<Box 
			sx={{
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center', 
				padding: '0 80px', 
				margin: '24px 0'
			}}
		>
			<p>{capitalizeFirstLetter(userName)}</p>
			<Button
				onClick={() => setUserData(null)}
				variant="contained"
			>
				Déconnexion
			</Button>
		</Box>
	)
}
