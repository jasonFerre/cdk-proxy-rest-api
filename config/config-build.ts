import { Environment } from 'aws-cdk-lib'

import { Parameters } from './parameters'
import { Config } from './config'

type SsmParameter = {
  [key: string]: string
}

export type ConfigBuild = {
  projectName: string
  ssmParameters: SsmParameter
  env?: Environment
  envName: string
  envVariables: { [key: string]: string }
}

const environmentName = process.env.ENVIRONMENTNAME ?? 'uat'

console.log(`environmentName: ${environmentName}`)
export const buildEnvironment = () => {
  console.log(
    `aws pipeline region - account environment ${process.env.AWS_DEFAULT_REGION} - ${process.env.AWS_ACCOUNT}`,
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonSettings = Config[`${environmentName}`] as any

  const settings: ConfigBuild = {
    envVariables: {},
    projectName: Config.projectName as string,
    ssmParameters: Parameters,
    envName: environmentName,
    env: {
      account: process.env.AWS_ACCOUNT || jsonSettings.env.account,
      region: process.env.AWS_DEFAULT_REGION || jsonSettings.env.region,
    },
  }

  return settings
}
