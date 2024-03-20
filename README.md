# AWS CDK TypeScript Project with Lambda Proxy Integration in API Gateway

This project is a Lambda proxy integration in API Gateway, developed with AWS Cloud Development Kit (CDK) using TypeScript. The project also includes a DynamoDB database and leverages TSyringe for dependency injection.

The project follows good practices like Test-Driven Development (TDD) and Domain-Driven Design (DDD). Jest is used for running unit tests.

## Important Modules Used

* Tsyring: A lightweight dependency injection container for TypeScript
* Middy: Middy is a very simple middleware engine that allows you to simplify your AWS Lambda code when using Node.js.
* DynamoDB-Toolbox:  is a set of tools that makes it easy to work with Amazon DynamoDB and the DocumentClient.
* AWS-SDK V3: AWS APIs

## Project Structure

The project is structured following the DDD principles. The core business logic is isolated from the infrastructure code, which includes the AWS CDK stacks and the Lambda functions.

## Getting Started

## Scripts

This project uses npm scripts for managing workflow. Here is a list of the available commands:

* `npm run lint`: Lint the code with ESLint.
* `npm run lint-fix`: Automatically fix ESLint issues.
* `npm start`: Install the dependencies and start the project.
* `npm run format`: Format the code with Prettier.
* `npm run api-deploy`: Synthesize the AWS CDK app into CloudFormation templates and deploy all stacks in the app.
* `npm run api-destroy`: Destroy all stacks in the AWS CDK app.
* `npm run test`    perform the jest unit tests for the src code

## How To Deploy
steps to deploy

