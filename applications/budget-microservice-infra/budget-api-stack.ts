import { RemovalPolicy, Stack, aws_dynamodb as ddb } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as path from 'path'
import { ISharedStackProps } from '../../lib/base-interfaces/stack-properties-interface'
import { NodeFunction } from '../../lib/base-constructs/nodejs-function'
import { RestProxyApi } from '../../lib/base-constructs/proxy-rest-api'
import { SSM } from '../../lib/base-constructs/ssm'

export class BudgetApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ISharedStackProps) {
    super(scope, id, props)

    const baseFolder = '../../src/api/proxy-handler.ts'

    const budgetTable = new ddb.Table(this, 'budget-table', {
      partitionKey: {
        name: 'PK',
        type: ddb.AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: ddb.AttributeType.STRING,
      },
      tableName: 'budget-table',
      removalPolicy: RemovalPolicy.DESTROY,
    })

    const proxyHandler = NodeFunction.createDefaultFunction(this, {
      functionName: 'budget-proxy-api-handler',
      description: 'Budget API Microservice',
      entry: path.resolve(__dirname, baseFolder),
      environment: {
        ENVIRONMENT: props.AppSettings.envName,
        TABLE: budgetTable.tableName,
      },
    })

    budgetTable.grantReadWriteData(proxyHandler)

    const api = RestProxyApi.proxyAPI(this, {
      handler: proxyHandler,
      restApiName: 'budget-api',
      stageName: props.AppSettings.envName,
    })

    SSM.createParameter(this, {
      parameterName: '/budget-api/endpoint',
      stringValue: api.url!,
    })
  }
}
