// create a new cdk construct to define a Rest proxy API
import { Construct } from 'constructs'
import { Duration, RemovalPolicy, aws_apigateway as apigw, aws_logs as logs, aws_lambda as lambda } from 'aws-cdk-lib'
import { NodeFunction } from './nodejs-function'
import * as path from 'path'

export interface RestProxyApiProps extends apigw.RestApiProps {
  stageName: string
  handler: lambda.IFunction
}

export abstract class RestProxyApi {
  static proxyAPI(scope: Construct, props: Partial<RestProxyApiProps>) {
    const apiLogs = new logs.LogGroup(scope, props.restApiName!.concat('-logs'), {
      logGroupName: props.restApiName!.concat('-logs'),
      removalPolicy: RemovalPolicy.DESTROY,
    })

    // lambda authorizer for the rest api
    const lambdaAuth = NodeFunction.createDefaultFunction(scope, {
      functionName: props.restApiName!.concat('-authorizer'),
      description: 'Custom Token Authorizer',
      entry: path.resolve(__dirname, '../../src/api/auth/authorizer.ts'),
      environment: {
        ENVIRONMENT: 'props.AppSettings.envName',
      },
    })
    // configure authorizer for the lambda rest api
    const authorizer = new apigw.TokenAuthorizer(scope, 'authorizer', {
      handler: lambdaAuth,
      identitySource: 'method.request.header.Authorization',
      resultsCacheTtl: Duration.seconds(0),
    })

    const cors = {
      allowOrigins: apigw.Cors.ALL_ORIGINS,
      allowMethods: apigw.Cors.ALL_METHODS,
      allowHeaders: apigw.Cors.DEFAULT_HEADERS,
    }

    const defaultProps = {
      defaultCorsPreflightOptions: cors,
      endpointConfiguration: {
        types: [apigw.EndpointType.EDGE],
      },
      defaultMethodOptions: {
        authorizationType: apigw.AuthorizationType.CUSTOM,
        authorizer,
      },
      deployOptions: {
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
