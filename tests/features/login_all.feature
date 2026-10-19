@login
Feature: Login scenario in WebShop website

Background: 
Given I navigate to WebShop website
When I click on the Log in link

@success 
Scenario: Successful login with valid credentials
When I enter valid credentials
|email   |{userEmail}|
|password| Arij2026  |
And I click on the Log in button
Then  I verify that I am redirected to the Home page with email '{userEmail}'
