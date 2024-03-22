import 'reflect-metadata'
import middy from '@middy/core'
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { inject, injectable } from 'tsyringe'
import { CustomAPIResponse } from '../../utils/api-response'
import { IBudgetService } from '../../services/interfaces/budget-service-interface'
import container from '../../../ioc'

@injectable()
export class BudgetGetHandler {
  constructor(
    @inject('BudgetService')
    private budgetService: IBudgetService,

    @inject(CustomAPIResponse)
    private customAPIResponse: CustomAPIResponse,
  ) {}

  async handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
      console.log('event', event.queryStringParameters)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await this.budgetService.GetAll(event.queryStringParameters as any)

      return await this.customAPIResponse.success(response)
    } catch (error) {
      return await this.customAPIResponse.error({ error, event, context })
    }
  }
}

const budgetGetHandlerInstance = container.resolve(BudgetGetHandler)
const budgetGetHandler = budgetGetHandlerInstance.handler.bind(budgetGetHandlerInstance)

// add schemas validation for post requests
export const getBudget = middy().handler(budgetGetHandler)
