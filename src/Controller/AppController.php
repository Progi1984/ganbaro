<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AppController extends AbstractController
{
    /**
     * @Route("/app/", name="dashboard")
     */
    public function dashboardAction()
    {
        return $this->render('app/dashboard.html.twig');
    }
}
