Feature: Register page

  Scenario: View the register page
    Given I am a user without an account
    When I visit the register page
    Then I should see the register page
