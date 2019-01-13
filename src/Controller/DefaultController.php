<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="index")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction()
    {
        return $this->redirectToRoute('dashboard');
    }

    /**
     * @Route("/app/", name="dashboard")
     */
    public function dashboardAction()
    {
        return new Response('connected');
    }

    public function registrationAction()
    {
        return $this->redirectToRoute('dashboard');
    }
}