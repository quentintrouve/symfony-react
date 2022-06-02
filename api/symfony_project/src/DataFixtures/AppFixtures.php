<?php

namespace App\DataFixtures;

use App\Factory\PostFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
			UserFactory::createMany(5);
			PostFactory::createMany(50, function(){
				return ["creator_id" => UserFactory::random()];
			});

			$manager->flush();
    }
}
