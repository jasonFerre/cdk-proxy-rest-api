import { aws_ssm as ssm } from 'aws-cdk-lib'
import { Construct } from 'constructs'

export abstract class SSM {
  static createParameter(scope: Construct, props: ssm.StringParameterProps): void {
    new ssm.StringParameter(scope, props.parameterName!, {
      parameterName: props.parameterName!,
      stringValue: props.stringValue!,
    })
  }
}
