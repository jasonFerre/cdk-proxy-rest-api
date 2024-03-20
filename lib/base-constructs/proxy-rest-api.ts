// create a new cdk construct to define a Rest proxy API
import { Construct } from 'constructs'
import { RemovalPolicy, aws_apigateway as apigw, aws_logs as logs } from 'aws-cdk-lib'

export abstract class RestProxyApi {
  static lambdaProxyAPI(scope: Construct, props: Partial<apigw.LambdaRestApiProps>) {
    const apiLogs = new logs.LogGroup(scope, props.restApiName!.concat('-logs'), {
      logGroupName: props.restApiName!.concat('-logs'),
      removalPolicy: RemovalPolicy.DESTROY,
    })
    const defaultProps = {
      proxy: true,

      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
      },
      endpointConfiguration: {
        types: [apigw.EndpointType.EDGE],
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
    } as apigw.LambdaRestApiProps

    return new apigw.LambdaRestApi(scope, defaultProps.restApiName!, defaultProps)
  }
}
