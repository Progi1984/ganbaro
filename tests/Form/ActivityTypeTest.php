<?php

namespace App\Tests\Form\Type;

use App\Entity\Activity;
use App\Form\Type\ActivityType;
use Symfony\Component\Form\Test\TypeTestCase;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Form\Extension\Validator\ValidatorExtension;

class TestedTypeTest extends TypeTestCase
{
    protected function getExtensions()
    {
        $validator = Validation::createValidator();
        return [
            new ValidatorExtension($validator),
        ];
    }
    
    public function testSubmitValidData()
    {
        $formData = [
            'type' => Activity::TYPE_RUN,
            'distance' => 1.5,
            'distance_unit' => Activity::UNIT_DISTANCE_KM,
            'elevation_unit' => Activity::UNIT_DISTANCE_M,
            'energy_unit' => Activity::UNIT_ENERGY_KCAL,
        ];

        $activity = new Activity();
        $form = $this->factory->create(ActivityType::class, $activity);

        $object = new Activity();
        $object
            ->setType($formData['type'])
            ->setDistance($formData['distance'])
            ->setDistanceUnit($formData['distance_unit'])
            ->setElevationUnit($formData['elevation_unit'])
            ->setEnergyUnit($formData['energy_unit']);

        // submit the data to the form directly
        $form->submit($formData);

        $this->assertTrue($form->isSynchronized());

        // check that $objectToCompare was modified as expected when the form was submitted
        $this->assertEquals($object, $activity);

        $view = $form->createView();
        $children = $view->children;

        foreach (array_keys($formData) as $key) {
            $this->assertArrayHasKey($key, $children);
        }
    }
}
