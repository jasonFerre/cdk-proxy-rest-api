export const Config: { [key: string]: unknown } = {
  // Never modify this parameters, unless you tested all the environments
  projectName: 'api-cdk-devops',
  dev: {
    env: {
      account: '924245329070',
    },
    network: [
      {
        region: 'us-east-1',
        vpcId: 'vpc-0dcbcef5f4e12117c',
        vpcCIDR: '10.0.0.0/16',
        securityGroup: 'sg-0f8378f007a7ebaac',
        subnets: [
          {
            subnetId: 'subnet-006cf7375564cda72',
            az: 'us-east-1b',
          },
          {
            subnetId: 'subnet-0354a9bf358503153',
            az: 'us-east-1a',
          },
        ],
      },
    ],
    envName: 'dev',
  },
}
