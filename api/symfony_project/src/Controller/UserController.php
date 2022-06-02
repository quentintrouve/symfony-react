<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Controller\ApiJWTController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;



class UserController extends AbstractController
{
	/**
	 * @Route("/login", name="app_login", methods="POST")
	 * @param ApiJWTController $jwtController
	 * @return JsonResponse
	 */
	public function login(ApiJWTController $jwtController)
	{
		$user = $this->getUser();
		$userInfos = $user->getUserAuthInfos();

		$jwt = $jwtController->createJwt($userInfos);

		$response = [
			"status" => "valid",
			"token" => $jwt
		];

		return new JsonResponse($response, 200);
	}

	/**
	 * @Route("/register", methods="POST")
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @param UserPasswordHasherInterface $hasher
	 * @return JsonResponse
	 */
	public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $hasher)
	{
		$name = $request->request->get('name');
		$email = $request->request->get('email');
		$password = $request->request->get('password');

		$user = new User();
		$user->setName($name);
		$user->setEmail($email);
		$user->setPassword($hasher->hashPassword($user, $password));

		$entityManager->persist($user);
		$entityManager->flush();
		
		$response = ['status' => 'ok'];

		return new JsonResponse($response);
	}
}