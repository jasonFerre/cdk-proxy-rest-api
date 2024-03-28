import { Duration, aws_lambda as lambda, aws_logs as logs, aws_iam as iam } from 'aws-cdk-lib'
import { LogLevel, NodejsFunction, NodejsFunctionProps, SourceMapMode } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'

export abstract class NodeFunction {
  static createDefaultFunction(scope: Construct, props: Partial<NodejsFunctionProps>): NodejsFunction {
    if (!props.functionName) throw new Error('Function name is required')

    const defaultProps: NodejsFunctionProps = {
      timeout: Duration.seconds(30),
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
      },
      bundling: {
        externalModules: ['aws-sdk', 'aws-lambda', '@aws-sdk/client-dynamodb', '@aws-sdk/lib-dynamodb'],
        keepNames: true,
        minify: true,
        sourceMap: true,
        sourceMapMode: SourceMapMode.INLINE,
        target: 'es2020',
        logLevel: LogLevel.INFO,
      },
      logRetention: logs.RetentionDays.ONE_WEEK,
      tracing: lambda.Tracing.ACTIVE,
    }

    const lambdaProps: NodejsFunctionProps = {
      ...defaultProps,
      ...props,
    }

    const customFn = new NodejsFunction(scope, props.functionName, lambdaProps)

    // Add managed policies using optional chaining
    customFn.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'))
    customFn.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXrayFullAccess'))
    customFn.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'))

    return customFn
  }
}
