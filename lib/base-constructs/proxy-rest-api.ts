// create a new cdk construct to define a Rest proxy API
import { Construct } from 'constructs'
import { RemovalPolicy, aws_apigateway as apigw, aws_logs as logs } from 'aws-cdk-lib'
import { NodeFunction } from './nodejs-function'
import * as path from 'path'

export abstract class RestProxyApi {
  static lambdaProxyAPI(scope: Construct, props: Partial<apigw.LambdaRestApiProps>) {
    const apiLogs = new logs.LogGroup(scope, props.restApiName!.concat('-logs'), {
      logGroupName: props.restApiName!.concat('-logs'),
      removalPolicy: RemovalPolicy.DESTROY,
    })

    // lambda authorizer for the rest api
    const lambdaAuth = NodeFunction.createDefaultFunction(scope, {
      functionName: 'budget-api-authorizer',
      description: 'Authorizer for the lambda rest api',
      entry: path.resolve(__dirname, '../../src/api/auth/authorizer.ts'),
      environment: {
        ENVIRONMENT: 'props.AppSettings.envName',
      },
    })
    // configure authorizer for the lambda rest api
    const authorizer = new apigw.TokenAuthorizer(scope, 'authorizer', {
      handler: lambdaAuth,
      identitySource: 'method.request.header.Authorization',
    })

    const defaultProps = {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
      },
      endpointConfiguration: {
        types: [apigw.EndpointType.EDGE],
      },
      defaultMethodOptions: {
        authorizationType: apigw.AuthorizationType.CUSTOM,
        authorizer,
      },
      deployOptions: {
        stageName: 'dev', // create stage based on the env variables
        loggingLevel: apigw.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        accessLogDestination: new apigw.LogGroupLogDestination(apiLogs),
        tracingEnabled: true,
      },
      cloudWatchRole: true,
      ...props,
    } as apigw.RestApiProps

    const api = new apigw.RestApi(scope, defaultProps.restApiName!, defaultProps)
    api.root.addProxy({
      anyMethod: true,
      defaultIntegration: new apigw.LambdaIntegration(props.handler!),
    })
    return api
  }
}
