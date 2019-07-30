<?php

use Behat\Behat\Context\Context;
use Behat\MinkExtension\Context\RawMinkContext;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * This context class contains the definitions of the steps used by the demo
 * feature file. Learn how to get started with Behat and BDD on Behat's website.
 *
 * @see http://behat.org/en/latest/quick_start.html
 */
class FeatureContext extends RawMinkContext implements Context
{
    /**
     * @var KernelInterface
     */
    private $kernel;

    public function __construct(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }
    
    /**
     * @Given /^I am authenticated as "([^"]*)" with "([^"]*)"$/
     */
    public function iAmAuthenticatedAs($username, $password)
    {
        $this->visitPath('/login');
        $this->getSession()->getPage()->fillField('Username', $username);
        $this->getSession()->getPage()->fillField('Password', $password);
        $this->getSession()->getPage()->pressButton('Log in');
    }
        
    /**
     * Click on element CSS with index name
     *
     * @When /^(?:|I )click on "(?P<id>(?:[^"]|\\")*)"$/
     */
    public function clickOn($element)
    {
        $this->assertSession()->elementExists('css', $element)->click();
    }

    /**
     * @Given /^I set in field "([^"]*)" with "([^"]*)"$/
     */
    public function iSetInFieldWith($field, $value)
    {
        $this->getSession()->getPage()->find('css', 'input[name="'.$field.'"]')->setValue($value);
    }
}
