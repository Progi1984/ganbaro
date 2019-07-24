<?php

namespace App\Form;

use App\Entity\Activity;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Validator\Constraints\Choice;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\Time;
use Symfony\Component\Validator\Constraints\GreaterThanOrEqual;
use Symfony\Component\Validator\Constraints\LessThan;

class ActivityType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->setAttribute('class', 'ui -loading form')
            ->add('type', HiddenType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Sport : This field can\' be empty.',
                    ]),
                    new Choice([
                        'choices' => Activity::TYPE,
                        'message' => 'Sport : Please choose a valid sport.'
                    ])
                ]
            ])
            ->add('date', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Date : This field can\' be empty.',
                    ]),
                    new Date([
                        'message' => 'Date : The value is not well formatted (Format YYYY-mm-dd).'
                    ])
                ],
                'mapped' => false,
            ])
            ->add('time', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Time : This field can\' be empty.',
                    ]),
                    new Time([
                        'message' => 'Time : The value is not well formatted (Format HH:mm:ss).'
                    ])
                ],
                'mapped' => false,
            ])
            ->add('distance', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Distance : This field can\' be empty.',
                    ]),
                    new GreaterThan([
                        'value' => 0,
                        'message' => 'Distance : The value should be greater than 0.'
                    ])
                ]
            ])
            ->add('distance_unit', HiddenType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Distance Unit : This field can\' be empty.',
                    ]),
                    new Choice([
                        'choices' => Activity::UNIT_DISTANCE,
                        'message' => 'Distance Unit : Please choose a valid distance unit.'
                    ])
                ]
            ])
            ->add('elevation', TextType::class, [
                'required' => false,
                'constraints' => [
                    new GreaterThan([
                        'value' => 0,
                        'message' => 'Elevation : The value should be greater than 0.'
                    ])
                ]
            ])
            ->add('elevation_unit', HiddenType::class, [
                'required' => false,
                'constraints' => [
                    new Choice([
                        'choices' => Activity::UNIT_DISTANCE,
                        'message' => 'Distance Unit : Please choose a valid distance unit.'
                    ])
                ]
            ])
            ->add('duration_hour', TextType::class, [
                'constraints' => [
                    new GreaterThanOrEqual([
                        'value' => 0,
                        'message' => 'Duration : The duration must be greather than 0 hour'
                    ])
                ],
                'mapped' => false,
            ])
            ->add('duration_minute', TextType::class, [
                'constraints' => [
                    new LessThan([
                        'value' => 60,
                        'message' => 'Duration : The duration must be less than 60 minutes'
                    ])
                ],
                'mapped' => false,
            ])
            ->add('duration_second', TextType::class, [
                'required' => false,
                'constraints' => [
                    new LessThan([
                        'value' => 60,
                        'message' => 'Duration : The duration must be less than 60 seconds'
                    ])
                ],
                'mapped' => false,
            ])
            ->add('energy', TextType::class, [
                'required' => false,
                'constraints' => 
                new GreaterThan([
                    'value' => 0,
                    'message' => 'Calories : The value should be greater than 0.'
                ])
            ])
            ->add('energy_unit', HiddenType::class, [
                'required' => false,
                'constraints' => [
                    new Choice([
                        'choices' => Activity::UNIT_ENERGY,
                        'message' => 'Distance Unit : Please choose a valid distance unit.'
                    ])
                ]
            ])
            ->add('description', TextareaType::class, [
                'required' => false
            ])
            ->add('gps_points', HiddenType::class, [
                'required' => false
            ])
            ->add('save', SubmitType::class, [
                'attr' => [
                    'type' => 'submit'
                ]
            ])
        ;
    }
}
