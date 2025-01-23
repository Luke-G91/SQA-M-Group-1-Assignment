# SQA Group 1 Blog App

## Table of Contents

- [Introduction](#introduction)
- [Team Contributions](#team-contributions)
- [Setup Instructions](#setup-instructions)
  - [Quick Setup](#quick-setup)
  - [Local Setup](#local-setup)
  - [Running Tests](#running-tests)
- [Features](#features)
- [Challenges and Solutions](#challenges-and-solutions)
- [Evidence for Marking Criteria](#evidence-for-marking-criteria)
  - [Feature Implementation](#feature-implementation)
  - [Testing](#testing)
  - [Security Enhancements](#security-enhancements)
  - [Code Quality and Refactoring](#code-quality-and-refactoring)
  - [CI/CD and Git Practices](#ci-cd-and-git-practices)
- [Conclusion](#conclusion)

## Introduction

- **Purpose:** This project aims to enhance a basic blog application by implementing software quality assurance (SQA) principles. The objectives include improving security, testing, and code quality while demonstrating effective collaboration using Git and GitHub.

## Team Contributions

| Team Member      | Login Flow | Search and Home Improvements | Likes and Comments | User Profiles | README documentation | Unit Tests | Integration Tests | BDD Tests |
| ---------------- | ---------- | ---------------------------- | ------------------ | ------------- | -------------------- | ---------- | ----------------- | --------- |
| Ben Hayward      |            |                              | ✔                 |               |                      |            |                   |           |
| Elijah Kalambayi |            |                              |                    | ✔            |                      |            |                   |           |
| Ismahän Hassan   |            | ✔                           |                    |               |                      |            |                   |           |
| Luke Goodwin     | ✔         |                              |                    |               | ✔                   |            |                   |           |

# Setup Instructions

### Quick Setup

1. Launch the application using Docker

   To start the entire stack quickly using a postgres container and the app container, which will be avaliable [here](http://localhost:1234/)

   ```bash
   docker-compose up
   ```

### Local Setup

1. **Install Dependencies**

   To install the necessary packages

   ```bash
   npm install
   ```

2. **Environment Configuration**

- Create a `.env` file in the root directory with the following variables

  - `PORT` (optional, defaults to 3000)
  - `SESSION_SECRET`

    Generate by using the following command:

    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

3. **Starting the Application**

- To start the app with a local SQLite database, execute

  ```bash
  npm run start:local
  ```

- If you prefer using a different database, specify a connection string in the `.env` file using the `DATABASE_URL` variable.

4. **Optional: PostgreSQL Setup via Docker**

- To start a PostgreSQL database using Docker, run

  ```bash
  docker-compose up postgres
  ```

- Use the following connection URL in your `.env` file

  ```text
  DATABASE_URL=postgres://myuser:mypassword@localhost:5432/mydatabase
  ```

5. **Accessing the Application**
   - The application will be accessible on the defined localhost port. Users will need to register an account upon first access.

### Running Tests

- **Behavior-Driven Development (BDD) Tests**

  ```bash
  npm run test:bdd
  ```

- **Unit and Integration Tests**

  ```bash
  npm run test:jest
  ```

- **All Tests**

  ```bash
  npm run test
  ```

## Features

- **Login Flow:** Secure user authentication and authorization.
- **Blog Search and Home Page Improvements:** Enhanced user interface and search functionality.
- **Blog Likes and Comments:** Interactive features for user engagement.
- **User Profiles:** Personalized user experience with profile management.

## Challenges and Solutions

| Challenge                 | Risk                                                                                                                        | Solution                                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Implementing secure login | User details including passwords are accessible that and anyone can access anyone else's account                            | Used bcrypt for password hashing and CSRF protection.                                                                        |
| SQL injection             | Database queries such as blog post search could allow SQL queries to be added to the search to leak or modify database data | Sequlize uses paramteised queries which safely escape and inject parameters to prevent malicious alteration of the SQL query |

## Evidence for Marking Criteria

### Feature Implementation

Description: 
This blog application offers key features for an enhanced user experience. Users can search for posts by keywords, blog name, or author, with the option to clear their search. They can like posts to show appreciation and comment to foster discussions, with the ability to edit their comments. A secure login and registration system ensures user data protection, allowing registered users to access interactive features like liking and commenting.

- **Code Reference:** 
![Authentication feature] (feature.png)
![Registration feature](feature-1.png)
![Like feature](feature-2.png) ![Comment](feature-3.png)
![Search feature](feature-4.png) ![Search HTML Pug](feature-5.png)
![Registration HTML Pug](feature-6.png)
![CSS for Search feature](feature-7.png)
![CSS for comment feature](feature-8.png)

- **Additional Evidence:** 
![Luke's pull request for user authentication](feature-12.png)
![commits for the user authentication](feature-13.png)
![Ben's pull request for Likes](feature-14.png) ![Pull request for comment](feature-15.png)
![commits for comment](feature-16.png)
![Ismahan's pull request for Search feature](feature-17.png)
![Commuts for search](feature-18.png)

### Testing

- **Testing Approach:** Utilized Jest for unit and integration tests.
- **Coverage Report:** [Screenshots of test coverage]

### Security Enhancements

- **Security Measures:** Implemented password hashing and CSRF protection.
- **Code Reference:** [Link to relevant code sections]

### Code Quality and Refactoring

- **Modularization:** Improved code structure for better maintainability.
- **Code Standards:** Followed industry-standard coding practices.

### CI/CD and Git Practices

- **CI/CD Workflows:** Set up GitHub Actions for automated testing and linting.
- **Collaboration Evidence:** [Screenshots or logs from GitHub Actions]

## Feature Implementation Evidence

- **Video Demonstration:** [Link to video demonstrating features]

## Testing Evidence

- **Test Execution:** [Screenshots of running tests]
- **Coverage Report:** [Screenshots of coverage report]

## Security Enhancements Evidence

- **Security Implementation:** [Description and code references]

## Code Quality and Refactoring Evidence

- **Code Improvements:** [Description and code references]

## CI/CD and Git Practices Evidence

- **Workflow Evidence:** [Screenshots or logs]

## Conclusion

- **Project Outcomes:** Successfully enhanced the blog application with improved security, testing, and user features.
- **Future Improvements:** Plan to further optimize performance and expand user functionalities.
