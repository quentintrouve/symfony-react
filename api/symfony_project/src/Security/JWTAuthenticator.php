<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use App\Controller\ApiJWTController;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;

class JWTAuthenticator extends AbstractAuthenticator
{
    public function supports(Request $request): ?bool
    {
			if(isset(getallheaders()["Authorization"])) {
				return true;
			} else {
				return false;
			}
    }

    public function authenticate(Request $request): Passport
    {
			$jwt = getallheaders()["Authorization"];

			$jwtController = new ApiJWTController('my_key');
			$verifyJwt = $jwtController->verifyJwt($jwt);
			$jwtPayload = (array) $verifyJwt;

			$userEmail = isset($jwtPayload['email']) ? $jwtPayload['email'] : " ";

			return new SelfValidatingPassport(
				new UserBadge($userEmail)
			);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse([
					"status" => "error",
					"message" => $exception->getMessage()
				]);
    }
}
