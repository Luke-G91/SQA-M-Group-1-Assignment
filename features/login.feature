Feature: Login page

  Scenario: View the login page
    Given I am not signed in
    When I visit the login page
    Then I should see the login page
