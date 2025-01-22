Feature: Home Page

  Scenario: View the home page  
    Given I am a user 
    When I visit the home page  
    Then I should see "Blog Posts"  


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