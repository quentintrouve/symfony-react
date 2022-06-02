import jwt_decode from "jwt-decode";
import axios from 'axios';
import { capitalizeFirstLetter } from './stringUtils'

export const  connexion = (
	data,
	isActive, 
	setIsLoading, 
	setPage, 
	setUserData, 
	setError
) => {

		axios({
			"method": "post",
			"url": "http://localhost:8245/login",
			"data": data,
			"headers": {"Content-Type": "multipart/form-data"}
		})
			.then(function (response) {
				if(isActive) {
					let jwtToken = response.data.token;
					let tokenDecoded = jwt_decode(jwtToken);

					setIsLoading(false);
					setPage('posts');
					setUserData(tokenDecoded);
				}
			})
			.catch(function (error) {
				console.log(error);
				let response = error.response;

				if(response.status === 401 && response.statusText === "Unauthorized") {
					setError({
						type: "error", 
						message: "Une erreur est survenue avec votre email ou votre mot de passe."
					})
				}
				setIsLoading(false);
			});
}

export const register = (
	data,
	isActive,
	setIsLoading,
	setPage,
	setRegisterMessage,
	setError
) => {

	axios({
		"method": "post",
		"url": "http://localhost:8245/register",
		"data": data,
		"headers": {"Content-Type": "multipart/form-data"}
	})
		.then(function (response) {
			if(isActive) {
				setIsLoading(false);
				setPage('login');
				setRegisterMessage(`Votre compte à bien été créé ${capitalizeFirstLetter(data.get('name'))}`)
			}
		})
		.catch(function (error) {
			setError({
				type: "error", 
				message: "Une erreur est survenue lors de la création de votre compte."
			})
			setIsLoading(false);

			console.log(error);
		});
}

export const  getPosts = (isActive, setIsLoading, setPostList, setError) => {
	axios({
		"method": "post",
		"url": "http://localhost:8245/posts",
	})
		.then((response) => {
			if(isActive) {
				let orderedData = response.data.reverse();
				setPostList(orderedData);
				setIsLoading(false)
			}
		})
		.catch((error) => {
			console.log(error);

			setError({
				type: "error", 
				message: "Une erreur est survenue lors du chargement des posts."
			})

			setIsLoading(false)
		})
}

export const  addPost = (
	data,
	userName,
	isActive,
	titleRef,
	contentRef,
	setIsLoading,
	setNewPost,
	setError
) => {
	axios({
		"method": "post",
		"url": "http://localhost:8245/new-post",
		"data": data,
		"headers": {"Content-Type": "multipart/form-data"}
	})
		.then(function (response) {
			if(isActive) {
				titleRef.current.value = ''
				contentRef.current.value = ''

				setNewPost({
					title: data.get('title'),
					creator_name: userName,
					content: data.get('content')
				})

				setIsLoading(false);
			}
		})
		.catch(function (error) {
			console.log(error);
			setIsLoading(false);
			setError({
				type: "error",
				message: "Une erreur est survenue lors de la création de votre post."
			})
		});
}