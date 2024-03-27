# AWS CDK TypeScript Project with Lambda Proxy Integration in API Gateway

This project is a Lambda proxy integration in API Gateway, developed with AWS Cloud Development Kit (CDK) using TypeScript. The project also includes a DynamoDB database and leverages TSyringe for dependency injection.

The project follows good practices like Test-Driven Development (TDD) and Domain-Driven Design (DDD). Jest is used for running unit tests.

## Important Modules Used

* Tsyring: A lightweight dependency injection container for TypeScript.
* Middy: Middy is a very simple middleware engine that allows you to simplify your AWS Lambda code when using Node.js.
* DynamoDB-Toolbox:  is a set of tools that makes it easy to work with Amazon DynamoDB and the DocumentClient.
* AWS-SDK V3: AWS APIs.
* NodeJS Function: Lambda runtime for NodeJS with JS/TS.
* ESBuild: Bundle.
* Jest: JavaScript testing framework.

## Project Structure

The project is structured following the DDD principles. The core business logic is isolated from the infrastructure code, which includes the AWS CDK stacks and the Lambda functions.

## Getting Started

To install all the dependencies locally please run the command: npm run start, after the process ends, you have seted the initial step to contribute with this project.

## Scripts

This project uses npm scripts for managing workflow. Here is a list of the available commands:

* `npm run lint`: Lint the code with ESLint.
* `npm run lint-fix`: Automatically fix ESLint issues.
* `npm start`: Install the dependencies and start the project.
* `npm run format`: Format the code with Prettier.
* `npm run api-deploy`: Synthesize the AWS CDK app into CloudFormation templates and deploy all stacks in the app.
* `npm run api-destroy`: Destroy all stacks in the AWS CDK app.
* `npm run test`    perform the jest unit tests for the src code

## How To Deploy Localy

Using CDK, you can run the command: npm run api-deploy, this will execute the necessary commands to deploy the application for your AWS environment.
Note: This step require one aws profile configured in your local environmet.

## How To Deploy CI-CD Github Workflow

1. Create a new GitHub repository.
2. In the repository settings, navigate to "Secrets" and add the following secrets:
    AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY
3. Additionally, define the following repository variables:
    AWS_ACCOUNT
    AWS_DEFAULT_REGION
4. Clone this repository to your local environment and update the GitHub configurations with those of the new repository.

5. Commit and push, please verify if the actions for your project is running.

## API Documentation

1. Copy the API stage URL.
2. Modify the 'url' variable in the OpenAPI document located at src/api/documentation/budget-api.yaml with the copied URL.
3. Run the following command:

