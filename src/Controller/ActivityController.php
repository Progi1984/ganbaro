<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Form\ActivityType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ActivityController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @Route("/app/activity/add", name="activityAdd")
     */
    public function activityAddAction(Request $request)
    {
        $activity = new Activity();

        $form = $this->createForm(ActivityType::class, $activity);
        $form->handleRequest($request);
    
        if ($form->isSubmitted() && $form->isValid()) {
            $data = $request->request->get('activity');
            $activity = $form->getData();
            $activity->setUser($this->getUser());
            $activity->setDateTime(
                new \DateTime($data['date']. ' '.$data['time'])
            );
            $activity->setDuration(
                (int)$data['duration_hour'] * 60 * 60
                + (int)$data['duration_minute'] * 60
                + (int)$data['duration_second']
            );

            $this->em->persist($activity);
            $this->em->flush();
            return $this->redirectToRoute('activityEdit', [
                'id' => $activity->getId(),
            ]);
        }

        return $this->render('app/activity/form.html.twig', [
            'form' => $form->createView(),
            'activityType' => Activity::TYPE,
            'activityDistanceUnit' => Activity::UNIT_DISTANCE,
            'activityEnergyUnit' => Activity::UNIT_ENERGY,
            'errors' => $form->getErrors(true)
        ]);
    }

    /**
     * @Route("/app/activity/edit/{id}", name="activityEdit")
     */
    public function activityEditAction(Request $request, int $id)
    {
        // Get the activity
        $activity = $this->em->getRepository(Activity::class)->findOneById($id);
        // Activity Not Found
        if (!$activity) {
            throw $this->createNotFoundException();
        }
        // Access denied
        if ($activity->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException()();
        }

        // Init the form
        $durationHour = $durationMinute = $durationSecond = 0;
        $durationHour = intdiv($activity->getDuration(), 3600);
        $durationMinute = intdiv($activity->getDuration() - $durationHour * 3600, 60);
        $durationSecond = $activity->getDuration() - $durationHour * 3600 - $durationMinute * 60;

        $form = $this->createForm(ActivityType::class, $activity);
        $form->get('duration_hour')->setData($durationHour);
        $form->get('duration_minute')->setData($durationMinute);
        $form->get('duration_second')->setData($durationSecond);
        $form->get('date')->setData($activity->getDatetime()->format('Y-m-d'));
        $form->get('time')->setData($activity->getDatetime()->format('H:i:s'));
        $form->handleRequest($request);
    
        if ($form->isSubmitted() && $form->isValid()) {
            $data = $request->request->get('activity');
            $activity = $form->getData();
            $activity->setDatetime(
                new \DateTime($data['date']. ' '.$data['time'])
            );
            $activity->setDuration(
                (int)$data['duration_hour'] * 60 * 60
                + (int)$data['duration_minute'] * 60
                + (int)$data['duration_second']
            );

            $this->em->persist($activity);
            $this->em->flush();
        }

        return $this->render('app/activity/form.html.twig', [
            'form' => $form->createView(),
            'activityType' => Activity::TYPE,
            'activityDistanceUnit' => Activity::UNIT_DISTANCE,
            'activityEnergyUnit' => Activity::UNIT_ENERGY,
            'errors' => $form->getErrors(true)
        ]);
    }
}
