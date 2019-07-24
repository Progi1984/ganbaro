<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="activity")
 */
class Activity
{
    const TYPE_CYCLE = 'Cycle';
    const TYPE_HIKE = 'Hike';
    const TYPE_KAYAK = 'Kayak';
    const TYPE_RUN = 'Run';
    const TYPE_SWIM = 'Swim';
    const TYPE_WALK = 'Walk';

    const TYPE = [
        self::TYPE_CYCLE => self::TYPE_CYCLE,
        self::TYPE_HIKE => self::TYPE_HIKE,
        self::TYPE_KAYAK => self::TYPE_KAYAK,
        self::TYPE_RUN => self::TYPE_RUN,
        self::TYPE_SWIM => self::TYPE_SWIM,
        self::TYPE_WALK => self::TYPE_WALK,
    ];

    const UNIT_DISTANCE_FEET = 'feet';
    const UNIT_DISTANCE_KM = 'km';
    const UNIT_DISTANCE_M = 'm';
    const UNIT_DISTANCE_MILES = 'miles';

    const UNIT_DISTANCE = [
        self::UNIT_DISTANCE_KM => self::UNIT_DISTANCE_KM,
        self::UNIT_DISTANCE_M => self::UNIT_DISTANCE_M,
        self::UNIT_DISTANCE_MILES => self::UNIT_DISTANCE_MILES,
        self::UNIT_DISTANCE_FEET => self::UNIT_DISTANCE_FEET,
    ];

    const UNIT_ENERGY_CAL = 'cal';
    const UNIT_ENERGY_KCAL = 'kCal';

    const UNIT_ENERGY = [
        self::UNIT_ENERGY_KCAL => self::UNIT_ENERGY_KCAL,
        self::UNIT_ENERGY_CAL => self::UNIT_ENERGY_CAL,
    ];

    /**
     * @ORM\Id
     * @ORM\Column(type="integer", name="act_id", nullable=false)
     * @ORM\GeneratedValue(strategy="AUTO")
     * @var int
     */
    protected $id;

    /**
     * @ORM\Column(type="string", name="act_type", nullable=false)
     * @var string
     */
    private $type = '';

    /**
     * @ORM\Column(type="datetime", name="act_datetime", nullable=true)
     * @var \DateTime
     */
    private $datetime;

    /**
     * @ORM\Column(type="integer", name="act_duration", nullable=false)
     * @var int
     */
    private $duration = 0;

    /**
     * @ORM\Column(type="float", name="act_distance", nullable=false)
     * @var float
     */
    private $distance = 0;

    /**
     * @ORM\Column(type="string", name="act_distanceUnit", nullable=false)
     * @var string
     */
    private $distanceUnit = self::UNIT_DISTANCE_KM;

    /**
     * @ORM\Column(type="float", name="act_elevation", nullable=true)
     * @var float
     */
    private $elevation;

    /**
     * @ORM\Column(type="string", name="act_elevationUnit", nullable=false)
     * @var string
     */
    private $elevationUnit = self::UNIT_DISTANCE_M;

    /**
     * @ORM\Column(type="integer", name="act_energy", nullable=true)
     * @var int
     */
    private $energy ;

    /**
     * @ORM\Column(type="string", name="act_energyUnit", nullable=false)
     * @var string
     */
    private $energyUnit = self::UNIT_ENERGY_CAL;

    /**
     * @ORM\Column(type="text", name="act_gpsPoints", nullable=true)
     * @var string
     */
    private $gpsPoints = '';

    /**
     * @ORM\Column(type="string", name="act_description", nullable=true)
     * @var string
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="activities")
     * @ORM\JoinColumn(name="act_usr_id", referencedColumnName="id")
     * @var User
     */
    private $user;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return \DateTime
     */ 
    public function getDatetime(): ?\DateTime
    {
        return $this->datetime;
    }

    /**
     * @return string
     */ 
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @return float
     */ 
    public function getDistance(): float
    {
        return $this->distance;
    }

    /**
     * @return string
     */ 
    public function getDistanceUnit(): string
    {
        return $this->distanceUnit;
    }

    /**
     * @return int
     */ 
    public function getDuration(): int
    {
        return $this->duration;
    }

    /**
     * @return float
     */ 
    public function getElevation(): ?float
    {
        return $this->elevation;
    }

    /**
     * @return string
     */ 
    public function getElevationUnit(): string
    {
        return $this->elevationUnit;
    }

    /**
     * @return int
     */ 
    public function getEnergy(): ?int
    {
        return $this->energy;
    }

    /**
     * @return string
     */ 
    public function getEnergyUnit(): string
    {
        return $this->energyUnit;
    }

    /**
     * @return string
     */ 
    public function getGpsPoints(): ?string
    {
        return $this->gpsPoints;
    }

    /**
     * @return string
     */ 
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @return User
     */ 
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param \DateTime $datetime
     * @return self
     */ 
    public function setDatetime(\DateTime $datetime): self
    {
        $this->datetime = $datetime;
        return $this;
    }

    /**
     * @param string $description
     * @return self
     */ 
    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @param float $distance
     * @return self
     */ 
    public function setDistance(float $distance): self
    {
        $this->distance = $distance;
        return $this;
    }

    /**
     * @param string $distanceUnit
     * @return self
     */ 
    public function setDistanceUnit(string $distanceUnit): self
    {
        $this->distanceUnit = $distanceUnit;
        return $this;
    }

    /**
     * @param int $duration
     * @return self
     */ 
    public function setDuration(int $duration): self
    {
        $this->duration = $duration;
        return $this;
    }

    /**
     * @param float $elevation
     * @return self
     */ 
    public function setElevation(float $elevation): self
    {
        $this->elevation = $elevation;
        return $this;
    }

    /**
     * @param string $elevationUnit
     * @return self
     */ 
    public function setElevationUnit(string $elevationUnit): self
    {
        $this->elevationUnit = $elevationUnit;
        return $this;
    }

    /**
     * @param float $energy
     * @return self
     */ 
    public function setEnergy(?float $energy): self
    {
        $this->energy = $energy;
        return $this;
    }

    /**
     * @param string $energyUnit
     * @return self
     */ 
    public function setEnergyUnit(string $energyUnit): self
    {
        $this->energyUnit = $energyUnit;
        return $this;
    }

    /**
     * @param string $gpsPoints
     * @return self
     */ 
    public function setGpsPoints(?string $gpsPoints): self
    {
        $this->gpsPoints = $gpsPoints;
        return $this;
    }

    /**
     * @param string $type
     * @return self
     */ 
    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @param User $user
     * @return self
     */ 
    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }
}