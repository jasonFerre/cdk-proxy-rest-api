export const Config: { [key: string]: unknown } = {
  // Never modify this parameters, unless you tested all the environments
  projectName: 'api-cdk-devops',
  dev: {
    env: {
      account: '',
      region: 'us-east-1',
    },
    envName: 'dev',
  },
  uat: {
    env: {
      account: '',
      region: 'us-east-1',
    },
    envName: 'uat',
  },
}
