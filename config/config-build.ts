import { Environment } from 'aws-cdk-lib'

import { Parameters } from './parameters'
import { Config } from './config'

type SsmParameter = {
  [key: string]: string
}
type subnet = {
  subnetId: string
  az: string
}
type Network = {
  region: string
  vpcId: string
  subnets: subnet[]
  vpcCIDR: string
  securityGroup: string
}

export type ConfigBuild = {
  projectName: string
  ssmParameters: SsmParameter
  network: Network[]
  env?: Environment
  envName: string
  organizationId: string
  envVariables: { [key: string]: string }
}

const environmentName = process.env.ENVIRONMENTNAME ?? 'dev'
const regionEnvironment = process.env.AWSREGION ?? 'us-east-1'

console.log(`environmentName: ${environmentName}`)
export const buildEnvironment = () => {
  console.log(`aws pipeline region environment ${regionEnvironment}`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonSettings = Config[`${environmentName}`] as any
  jsonSettings.env.region = regionEnvironment

  const settings = jsonSettings as ConfigBuild
  settings.ssmParameters = Parameters
  settings.envVariables = {}
  settings.projectName = Config.projectName as string
  settings.organizationId = Config.organizationId as string
  // console.log(settings)
  return settings
}
