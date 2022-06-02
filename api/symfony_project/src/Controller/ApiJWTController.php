<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class ApiJWTController extends AbstractController
{

	public function createJwt($userInfos)
	{
		$key = '';
		$payload = [
			'id' => $userInfos['id'],
			'name' => $userInfos['name'],
			'email' => $userInfos["email"]
		];

		$jwtToken = JWT::encode($payload, "jwt-key", 'HS256');

		return $jwtToken;
	}

	public function verifyJwt($jwt)
	{
		try {

			$decoded = JWT::decode($jwt, new Key("jwt-key", 'HS256'));
			return $decoded;

		} catch (Exception $exception) {

			return new JsonResponse([
				"status" => "error",
				"messsage" => $exception->getMessage()
			]);
		}
	}
}