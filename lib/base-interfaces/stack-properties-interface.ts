import { StackProps } from 'aws-cdk-lib'
import { ConfigBuild } from '../../config/config-build'

export interface ISharedStackProps extends StackProps {
  AppSettings: ConfigBuild
}
