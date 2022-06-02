<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\PostRepository;
use Doctrine\ORM\EntityManagerInterface;

class PostController extends AbstractController
{
	/**
	 * @Route("/posts")
	 * @param PostRepository $postRepository
	 * @return JsonResponse
	 */
	public function getPosts(PostRepository $postRepository)
	{
		$posts = $postRepository->findAll();
		$postsData = [];

		foreach ($posts as $post) {
			$postsData[] = $post->getPostData();
		}

		return new JsonResponse($postsData);
	}

	/**
	 * @Route("/new-post", methods="POST")
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return JsonResponse
	 */
	public function addPost(Request $request, EntityManagerInterface $entityManager)
	{
		$title = $request->request->get('title');
		$content = $request->request->get('content');
		$creatorId = $request->request->get('creator_id');

		$userRepository = $entityManager->getRepository(User::class);
		$user = $userRepository->find($creatorId);

		$post = new Post();
		$post->setTitle($title);
		$post->setContent($content);
		$post->setCreatorId($user);

		$entityManager->persist($post);
		$entityManager->flush();

		$response = ['status' => 'ok'];

		return new JsonResponse($response);
	}
}