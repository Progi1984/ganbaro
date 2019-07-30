Feature: Authentication
  In order to gain access to the application
  As an user
  I need to be able to login and logout
  Scenario: Log in
    Given I am on "/"
      And print last response
    When  I fill in "Username" with "user"
      And I fill in "Password" with "p@ssword"
      And I press "Log in"
    Then  I should be on "/app/"
      And I should see "Logout"

  Scenario: Log in with bad credentials
    Given I am on "/"
    When  I fill in "Username" with "user"
      And I fill in "Password" with "badp@ssword"
      And I press "Log in"
    Then  I should be on "/login"
      And I should see "Invalid credentials."