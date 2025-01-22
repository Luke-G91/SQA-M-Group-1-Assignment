Feature: Home Page

  Scenario: View the home page  
    Given I am a user 
    When I visit the home page  
    Then I should see "Blog Posts"  



  Scenario: View the search bar  
    Given I am a user  
    When I visit the home page  
    Then I should see the search bar  

 Scenario: View the search bar  
    Given I am a user  
    When I visit the home page  
    Then I should see the Search and Clear buttons
   
  Scenario: Input blog title
    Given I am a user
    When I visit the home page and I input blog title in search bar
    Then I should have the searched blog appear

  
  Scenario: Input author name
    Given I am a user
    When I visit the home page and I input author name of a blog in search bar
    Then I should have the related blogs to the author appear


  Scenario: View the search bar  
    Given I am a user  
    When I visit the home page  
    Then I should see the search bar  

 Scenario: View the search bar  
    Given I am a user  
    When I visit the home page  
    Then I should see the Search and Clear buttons
   
  Scenario: Input blog title
    Given I am a user
    When I visit the home page and I input blog title in search bar
    Then I should have the searched blog appear

  
  Scenario: Input author name
    Given I am a user
    When I visit the home page and I input author name of a blog in search bar
    Then I should have the related blogs to the author appear

  # Scenarios for Likes & Comment Features 
  Scenario: I View the home page
    Given I am a user
    When I create a post 
    Then I should see like count

  Scenario: I View the home page
    Given I am a user
    When I create a post 
    Then I should see comment count

  Scenario: I open a blog post
    Given I am a user
    When I create a post 
    When I open a blog post
    Then I should see its comment section