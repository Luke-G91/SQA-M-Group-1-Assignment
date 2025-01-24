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

| Team Member    | Login Flow | Search and Home Improvements | Likes and Comments | README documentation | Unit Tests | Integration Tests | BDD Tests |
| -------------- | ---------- | ---------------------------- | ------------------ | -------------------- | ---------- | ----------------- | --------- |
| Ben Hayward    |            |                              | ✔                 | ✔                   | ✔         | ✔                | ✔        |
| Ismahän Hassan |            | ✔                           |                    | ✔                   | ✔         | ✔                | ✔        |
| Luke Goodwin   | ✔         |                              |                    | ✔                   | ✔         | ✔                | ✔        |

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

| Challenge                             | Risk                                                                                                                        | Solution                                                                                                                                                                         |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Implementing secure login             | User details including passwords are accessible that and anyone can access anyone else's account                            | Used bcrypt for password hashing and CSRF protection                                                                                                                             |
| SQL injection                         | Database queries such as blog post search could allow SQL queries to be added to the search to leak or modify database data | Sequelize uses parameterized queries which safely escape and inject parameters to prevent malicious alteration of the SQL query                                                  |
| Merge conflicts                       | Multiple team members working on the same files could lead to code loss or incorrect merges                                 | Implemented clear branch naming conventions and required PR reviews. Used feature branches to isolate work. Communicated actively about which files team members were working on |
| Environment inconsistencies           | Code working locally but failing in different environments (Windows vs Linux, different Node versions)                      | Created Docker setup to ensure consistent development environment. Added detailed environment setup documentation. Specified exact dependency versions in package.json           |
| Time management with work commitments | Difficulty coordinating team activities due to different work schedules and commitments                                     | Set up async communication channels. Scheduled regular but flexible check-ins                                                                                                    |
| Database schema changes               | Changes to database models could break existing functionality                                                               | Created an ERD and implemented the required database schema early to prevent issues later                                                                                        |
| Testing environment setup             | Different testing approaches (unit, integration, BDD) required different configurations                                     | Created separate test configuration files. Added npm scripts for different test types. Documented test setup process                                                             |
| Code style consistency                | Different IDE settings and personal preferences leading to inconsistent code                                                | Implemented ESLint and Prettier.                                                                                                                                                 |
| Knowledge sharing                     | Team members having different levels of expertise in different areas                                                        | Created documentation for key implementations. Added comments for complex logic. Conducted code review sessions                                                                  |
| Passwords are not secure              | Users can use passwords that are simple and easy to guess allowing others to gain access to their account                   | Added backend validation to ensure passwords have a minimum length, include a caps character and a special character                                                             |

## Evidence for Marking Criteria

### Feature Implementation

Description:
This blog application offers key features for an enhanced user experience. Users can search for posts by keywords, blog name, or author, with the option to clear their search. They can like posts to show appreciation and comment to foster discussions, with the ability to edit their comments. A secure login and registration system ensures user data protection, allowing registered users to access interactive features like liking and commenting.

![Registration form with secure password hashing implementation](./screenshots/feature-1.png)
_Figure 1: The code implements a registration feature, securely hashing user passwords with bcrypt, saving user details via a controller, and redirecting to the login page upon successful registration_

![Like button and counter implementation](./screenshots/feature-2.png)
_Figure 2: The code implements a like feature, enabling logged-in users to toggle likes on blog posts and returning the updated like status and count in real-time_

![Comment section with CRUD operations](./screenshots/feature-3.png)
_Figure 3: The code implements a comment feature, enabling users to write and submit comments on specific blog posts, which are saved with user and post details_

![Blog search functionality with filtering options](./screenshots/feature-4.png)
_Figure 4: The code implements a search feature, allowing users to find blog posts by title or author, with the option to clear the search query and a message displayed when no blogs of that type are found._

![Search feature template in Pug](./screenshots/feature-5.png)
_Figure 5: Search feature HTML Pug implementation showing the search form and results layout._

![Registration feature HTML Pug implementation](./screenshots/feature-6.png)
_Figure 6: Registration feature HTML Pug implementation with form validation and error handling._

![CSS implementation for the search feature](./screenshots/feature-7.png)
_Figure 7: CSS implementation for the search feature_

![CSS implementation for the comment feature](./screenshots/feature-8.png)
_Figure 8: CSS implementation for the comment feature_

![Ben's pull request implementing blog router integration tests](./screenshots/feature-9.png)
_Figure 9: Ben's pull request implementing blog router integration tests_

![Ismahan's pull request implementing search functionality](./screenshots/feature-10.png)
_Figure 10: Ismahan's pull request implementing search functionality_

![Luke's pull request implementing user authentication testing](./screenshots/feature-11.png)
_Figure 11: Luke's pull request implementing user authentication testing_

![Luke's pull request implementing user authentication with bcrypt](./screenshots/feature-12.png)
_Figure 12: Luke's pull request implementing user authentication with bcrypt_

![Commit history showing authentication implementation progression](./screenshots/feature-13.png)
_Figure 13: Commit history showing authentication implementation progression_

![Ben's pull request implementing blog like feature](./screenshots/feature-14.png)
_Figure 14: Ben's pull request implementing blog like feature_

![Pull request implementing comment system](./screenshots/feature-15.png)
_Figure 15: Pull request implementing comment system_

![Commit history showing comment feature implementation](./screenshots/feature-16.png)
_Figure 16: Commit history showing comment feature implementation_

![Final search functionality pull request](./screenshots/feature-17.png)
_Figure 17: Final search functionality pull request_

![Search feature development commit history](./screenshots/feature-18.png)
_Figure 18: Search feature development commit history_

![Passport implementation and login router](./screenshots/feature-19.png)
_Figure 19: Passport implementation and login router_

- **Sample Code References:**

  - **User Authentication and Password Security**: [userController.js](./controllers/userController.js)
    Implements secure user authentication using bcrypt for password hashing and comparison. This prevents storing plaintext passwords and ensures secure login verification through cryptographic hashing.
    ```javascript
    // User authentication with secure password comparison
    exports.authUser = async (email, password, done) => {
      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword,
      );
      // ...
    };
    ```
  - **Blog Search and Filtering**: [blogPostController.js](./controllers/blogPostController.js)
    Provides case-insensitive search functionality across blog titles, content, and author names. Uses Sequelize's secure query parameters to prevent SQL injection while enabling flexible search capabilities.
    ```javascript
    // Case-insensitive search across multiple fields
    exports.getAllBlogPosts = async (searchQuery = "") => {
      const blogs = await BlogPost.findAll({
        where: {
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("title")),
              "LIKE",
              `%${searchQuery.toLowerCase()}%`,
            ),
            // ...
          ],
        },
      });
    };
    ```
  - **Comment Management**: [blogPostController.js](./controllers/blogPostController.js)
    Handles comment creation and validation with proper error handling and security checks. Ensures comments meet length requirements and are associated with authenticated users.
    ```javascript
    exports.addComment = async (commentData) => {
      // Basic validation
      if (!commentData || typeof commentData.comment !== "string") {
        throw new Error("Comment text is required");
      }
      const trimmedComment = commentData.comment.trim();
      if (trimmedComment.length > 500) {
        throw new Error("Comment cannot exceed 500 characters");
      }
      // ...
    };
    ```
  - **Database Schema Relations**: [models/index.js](./models/index.js)
    Establishes relationships between different entities in the application using Sequelize associations. Creates a proper data structure for users, posts, likes, and comments with appropriate foreign keys.
    ```javascript
    User.belongsToMany(BlogPost, {
      through: BlogLike,
      foreignKey: "userId",
      otherKey: "blogId",
    });
    BlogPost.hasMany(BlogComment, {
      foreignKey: "blogId",
      as: "comments",
    });
    ```
  - **Environment Configuration**: [config/database.js](./config/database.js)
    Manages different database configurations based on the application environment. Supports development with SQLite, testing with in-memory database, and production with PostgreSQL.
    ```javascript
    if (env === "test") {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
      });
    }
    ```
  - **User Input Validation**: [controllers/utils/validateUserData.js](./controllers/utils/validateUserData.js)
    Implements comprehensive validation for user registration data. Checks for proper email format, password strength, and required fields while preventing malicious inputs.
    ```javascript
    function validateUserData(userData) {
      if (!isValidEmail(userData.email)) {
        throw new Error("Invalid email format");
      }
      if (!isStrongPassword(userData.password)) {
        throw new Error("Password does not meet security requirements");
      }
      // ...
    }
    ```
  - **Views and Templates**:

    - **Main Layout**: [views/layout.pug](./views/layout.pug)
      Provides the base template with navigation and common elements across all pages. Includes proper CSS and JavaScript dependencies.

      ```pug
      doctype html
      html(lang="en")
        head
          title= title
          link(rel="stylesheet", href="/css/styles.css")
      ```

    - **Home Page**: [views/pages/home.pug](./views/pages/home.pug)
      Implements the search interface and blog post listing with dynamic content rendering.

      ```pug
      section.search-section
        .search-wrapper
          form(action="/home" method="GET")
            label(for="search") Search Motivational Blogs
      ```

    - **Blog Card Component**: [views/components/blogCard.pug](./views/components/blogCard.pug)
      Reusable component for displaying blog post previews with like counts and comments.
      ```pug
      div(id="blogPost")
        div(id="container")
          a(href=`/blog/${post.id}`) #{post.title}
      ```

### Testing

- **Comprehensive Unit and Integration Tests:** We have implemented comprehensive unit and integration tests using Jest. The tests cover various functionalities of the application, including edge cases.
- **Code Coverage:** Our tests achieve over 80% code coverage, ensuring that most of the codebase is tested.
- **Testing Techniques:** We have utilized Behavior-Driven Development (BDD) techniques to ensure the quality of our tests.
- **Testing Frameworks and Tools:** We used Jest for unit and integration tests, and Cucumber for BDD tests.
- **Continuous Integration:** Automated testing is set up using GitHub Actions to ensure tests are run on every push and pull request.
- **Example Test Cases:**
  - **Unit Test:** Testing the user authentication function.
  - **Integration Test:** Testing the interaction between the blog post creation and the database.
  - **BDD Test:** Testing the user login flow from the UI perspective.
- **Documentation:** Detailed documentation of the tests is provided, explaining the purpose and functionality of each test.

  - **Code Reference:**
    - Unit Tests:
      - [tests/unit/blogPostController.test.js](./tests/unit/blogPostController.test.js)
      - [tests/unit/userController.test.js](./tests/unit/userController.test.js)
    - Integration Tests:
      - [tests/integration/authRouter.test.js](./tests/integration/authRouter.test.js)
      - [tests/integration/blogRouter.test.js](./tests/integration/blogRouter.test.js)
    - BDD Tests:
      - [features/step_definitions/home.test.js](./features/step_defintions/home.test.js)
      - [features/home.feature](./features/home.feature)
      - [features/step_definitions/login.test.js](./features/step_defintions/login.test.js)
      - [features/login.feature](./features/login.feature)
      - [features/step_definitions/register.test.js](./features/step_defintions/register.test.js)
      - [features/register.feature](./features/register.feature)
  - **Coverage Report:**
    ![Test coverage report showing code coverage metrics for unit, integration and BDD tests](./screenshots/coverage_report.png)
    _Figure 20: Test coverage report showing code coverage metrics for unit, integration and BDD tests_
  - **Test Execution:**
    ![Example of a failing test execution demonstrating error reporting](./screenshots/failing_test.png)
    _Figure 21: Example of a failing test execution demonstrating error reporting_
    ![Example of a successful test execution showing all passing assertions](./screenshots/passing_test.png)
    _Figure 22: Example of a successful test execution showing all passing assertions_
    ![Overview of the complete test suite execution with test results summary](./screenshots/test_suite.png)
    _Figure 23: Overview of the complete test suite execution with test results summary_

### Security Enhancements

- **Input Validation:** We have implemented input validation to ensure that all user inputs are properly validated before processing.
- **CSRF Protection:** Cross-Site Request Forgery (CSRF) protection is implemented to prevent unauthorized actions on behalf of authenticated users.
- **Password Hashing:** User passwords are hashed using bcrypt before storing them in the database, ensuring that passwords are not stored in plain text.
- **Advanced Safeguards:** We have incorporated advanced safeguards against vulnerabilities such as Cross-Site Scripting (XSS) and SQL injection.
  - **XSS Protection:** Input fields are sanitized and encoded to prevent XSS attacks.
  - **SQL Injection Protection:** We use parameterized queries with Sequelize ORM to prevent SQL injection attacks.
- **Example Security Test Cases:**
  - **SQL Injection:** Testing input fields to ensure they are not vulnerable to SQL injection attacks.
  - **XSS:** Testing input fields to ensure they are not vulnerable to Cross-Site Scripting attacks.
- **Implementation Details:** Detailed implementation of security measures is provided in the codebase.

  - **Code Reference:**
    - Input Validation: [controllers/blogPostController.js#L13](./controllers/blogPostController.js#L13) // Validates and sanitizes blog post data
    - CSRF Protection: [routers/authRouter.js#L12](./routers/authRouter.js#L12) // Protects against CSRF attacks in authentication routes
    - Password Hashing: [routers/authRouter.js#L32](./routers/authRouter.js#L32) // Hashes user passwords before storing them
    - XSS Protection: [features/step_defintions/home.test.js#L30](./features/step_defintions/home.test.js#L30) // Ensures input fields are sanitized to prevent XSS
    - SQL Injection Protection: [models/index.js#L10](./models/index.js#L10) // Uses parameterized queries to prevent SQL injection
  - **Security Implementation:**
    - Input Validation: [controllers/blogPostController.js](./controllers/blogPostController.js) // Validates and sanitizes blog post data
    - CSRF Protection: [routers/authRouter.js](./routers/authRouter.js) // Protects against CSRF attacks in authentication routes
    - Password Hashing: [routers/authRouter.js](./routers/authRouter.js) // Hashes user passwords before storing them
    - XSS Protection: [features/step_defintions/home.test.js](./features/step_defintions/home.test.js) // Ensures input fields are sanitized to prevent XSS
    - SQL Injection Protection: [models/index.js](./models/index.js) // Uses parameterized queries to prevent SQL injection

### Code Quality and Refactoring

- **File Structure Update:** The project file structure was reorganized to facilitate modularization, improving maintainability and readability. [Modularized app functions](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/8/commits/099f51754eb220d1faf9914e0c692df9d2541108)
- **Environment Configuration:** Introduced a `.env` file to securely store configuration secrets such as the database URL and server port. [Database url from env](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/1)
- **Function Reusability:** Consolidated repeated code into separate, reusable functions.
- **Template Extensibility:** Organized Pug files and used `extends` for better template extensibility. [Pug file improvements](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/3/commits/53a2e8096c0240ab265d44bb1851a6ba0bfc358f)
- **Password Security:** Utilized `bcrypt` for secure password hashing. [Bcrypt alongside user auth](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/9/commits/b00384942f5c5327ccf75caa7543feae7c7fa959)
- **CSS Management:** Separated CSS into multiple files to enhance maintainability.
- **Error Handling:** Improved error handling for database interactions and synchronization.
- **Router Organization:** Split routers into distinct sections using different base paths for cleaner and more organized code. [Seperated routers](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/3/commits/84733bee3b2ac699d5e95b3eaf5bbf633f1789e8)
- **Docker Setup:** Created Docker and Docker Compose files for easy and consistent setup across different environments. [Docker Setup Example](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/11)
- **Router-Controller Separation:** Separated routers from controllers to maintain clear separation of concerns.
- **Environment-Specific Configurations:** Used different environments for local, testing, and production, allowing SQLite for local and PostgreSQL for production. [Test env added](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/3/commits/b179cb9dfe8134d7862fc721b770ae5e88014d3d)
- **Testing Scripts:** Added scripts in `package.json` to streamline running and testing processes.
- **Mocking in Tests:** Implemented mocks in unit tests to ensure consistent behavior and independence of functions.
- **Code Improvements Evidence:** [Code Formatting Example](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/19), [Refactor Example](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/3)

### CI/CD and Git Practices

- **CI/CD Setup:** Implemented GitHub Actions to automate testing for unit, integration, and BDD tests on a standardized environment using Node.js on Ubuntu. [List of Actions](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/actions)
- **Linting and Formatting:** Integrated ESLint for code linting and Prettier for consistent code formatting.
- **Database Model Management:** Organized database models in individual files and managed associations from a unified file. [Database models](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/6)
- **Naming Conventions:** Ensured function and variable names are readable and descriptive.
- **Branching Strategy:** Utilized a development branch workflow with releases to the main branch.
- **Branch Naming Conventions:** Followed industry standard git branching patterns such as `feat`, `doc`, `test`, `ci` for branch organization. [Test Naming Convention PR](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/242), [Doc Naming Convention PR](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/12), [CI Naming Convention PR](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/15)
- **Branch Protection Rules:** Established rules to enforce consistency, requiring PRs to be squashed into a single commit with standardized messages like `Feat: change here`.
- **Pull Request Reviews:** Required at least one review approval for PRs, with stale reviews upon further commits to ensure code quality. [Changes Requested Example with Comments](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/pull/21)
- **Merge Blockage on Request Changes:** Prevented merges until requested changes were addressed and approved.
- **GitHub Actions Enforcement:** Required passing GitHub Actions tests and lint checks before merging. [Successful Action Log](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/actions/runs/12927683564), [Failing Lint Action Log](https://github.com/Luke-G91/SQA-M-Group-1-Assignment/actions/runs/12929744677)

## Feature Implementation Evidence

- **Video Demonstration:** [Walkthrough video](https://youtu.be/Ovkz2Pbvh3M)

## Code Quality and Refactoring Evidence

### Code Structure Improvements

![Code Structure Before Refactor](./screenshots/app-before.png)
_Figure 24: App.js before refactor and modularization_

![Code Structure Before and After](./screenshots/app-after.png)
_Figure 25: App.js after refactor and modularization_

### Database Model Organization

![User Model User.js](./screenshots/user-model.png)
_Figure 26: Screenshot of individual User model_

![Blog Post Model BlogPost.js](./screenshots/blog-post-model.png)
_Figure 27: Screenshot of individual BlogPost model_

![Separate models](./screenshots/db-models.png)
_Figure 28: Screenshot showing the organized database models structure_

### Environment Configuration

```env
# Example of our .env structure
PORT=3000
SESSION_SECRET=****
DATABASE_URL=****
```

_Figure 29: Example of environment configuration (with sensitive data redacted)_

### Router Separation

![Router Organization](./screenshots/router-structure.png)
_Figure 30: Screenshot showing the separation of routes into distinct modules_

## CI/CD and Git Practices Evidence

### Branch Protection Rules

![Branch Protection Settings](./screenshots/protection-rules.png)
_Figure 31: Screenshot of GitHub branch protection rules configuration_

### Pull Request Review Process

![PR Review Example](./screenshots/resolved-comments.png)
_Figure 32: Example of a pull request with review comments that have been resolved_

![PR Review Example Comments](./screenshots/pr-comments.png)
_Figure 33: Example of pull request comments_

### GitHub Actions Workflow

![GitHub Actions Dashboard Fail](./screenshots/action-fail.png)
_Figure 34: Screenshot of GitHub Actions showing failing test runs_

![GitHub Actions Dashboard Success](./screenshots/action-success.png)
_Figure 35: Screenshot of GitHub Actions showing successful test runs_

### Code Quality Checks

![ESLint Results Fail](./screenshots/lint-fail.png)
_Figure 36: Example of ESLint code quality check with failed results_

![ESLint Results Success](./screenshots/lint-success.png)
_Figure 37: Example of ESLint code quality check successful results_

### Branching Strategy

![Git Graph](./screenshots/git-graph.png)
_Figure 38: Git graph showing our branching strategy in action_

## Conclusion

The team successfully delivered significant improvements to the blog application while implementing robust software quality assurance practices:

### Key Achievements

- Enhanced security through proper password hashing and CSRF protection
- Implemented comprehensive testing strategy including BDD, unit, and integration tests
- Added new features including user profiles, blog interactions (likes/comments), and improved search functionality
- Established efficient CI/CD pipelines using GitHub Actions
- Maintained high code quality through modularization and industry-standard practices

### Future Improvements

- Implement additional security features like two-factor authentication
- Enhance performance optimization for scaling
- Add more social features for user interaction
- Expand test coverage across all components
- Implement automated deployment pipelines
