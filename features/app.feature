Feature: Home Page

  Scenario: View the home page  
    Given I am a visitor  
    When I visit the home page  
    Then I should see "Blog Posts"  



  Scenario: View the search bar  
    Given I am a visitor  
    When I visit the home page  
    Then I should see the search bar  

 Scenario: View the search bar  
    Given I am a visitor  
    When I visit the home page  
    Then I should see the Search and Clear buttons
   
  Scenario: Input blog title
    Given I am a visitor
    When I visit the home page and I input blog title in search bar
    Then I should have the searched blog appear

  
  Scenario: Input author name
    Given I am a visitor
    When I visit the home page and I input author name of a blog in search bar
    Then I should have the related blogs to the author appear
