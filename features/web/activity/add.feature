Feature: Add an activity
  In order to add an activity
  As a user
  I need to be able to use the form
  Scenario: Add an activity without errors
    Given I am authenticated as "user" with "p@ssword"
      And I am on "/app/activity/add"
    When  I set in field "activity[type]" with "Run"
      And I fill in "activity[date]" with "2019-01-01"
      And I fill in "activity[time]" with "11:00:00"
      And I fill in "activity[distance]" with "1"
      And I fill in "activity[duration_hour]" with "1"
      And I fill in "activity[duration_minute]" with "0"
      And I press "Save"
    Then  the url should match "/app/activity/edit/"
      And the "activity_date" field should contain "2019-01-01"
      And the "activity_time" field should contain "11:00:00"
      And the "activity_distance" field should contain "1"
      And the "activity_duration_hour" field should contain "1"
      And the "activity_duration_minute" field should contain "0"

  Scenario: Add an activity with an error on Type
    Given I am authenticated as "user" with "p@ssword"
      And I am on "/app/activity/add"
    When  I set in field "activity[type]" with "BadValue"
      And I fill in "activity[date]" with "2019-01-01"
      And I fill in "activity[time]" with "11:00:00"
      And I fill in "activity[distance]" with "0"
      And I fill in "activity[elevation]" with "0"
      And I fill in "activity[duration_hour]" with "1"
      And I fill in "activity[duration_minute]" with "61"
      And I fill in "activity[duration_second]" with "61"
      And I fill in "activity[energy]" with "0"
      And I press "Save"
    Then  the url should match "/app/activity/add"
      And I should see "Sport : Please choose a valid sport."
      And I should see "Distance : The value should be greater than 0."
      And I should see "Elevation : The value should be greater than 0."
      And I should see "Duration : The duration must be less than 60 minutes."
      And I should see "Duration : The duration must be less than 60 seconds."
      And I should see "Calories : The value should be greater than 0."
      And I should see 6 ".list li" elements

  Scenario: Add an activity with empty values in datetime
    Given I am authenticated as "user" with "p@ssword"
      And I am on "/app/activity/add"
    When  I set in field "activity[type]" with "Run"
      And I fill in "activity[date]" with "BadValue"
      And I fill in "activity[time]" with "BadValue"
      And I fill in "activity[distance]" with "1"
      And I fill in "activity[duration_hour]" with "1"
      And I fill in "activity[duration_minute]" with "0"
      And I press "Save"
    Then  the url should match "/app/activity/add"
      And the "activity_date" field should contain ""
      And the "activity_time" field should contain ""
      And I should see 0 ".list li" elements
