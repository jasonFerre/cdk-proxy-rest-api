import 'reflect-metadata'
import middy from '@middy/core'
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { pathByIdSchema } from '../../schemas/budget/by-id-operations'
import validator from '@middy/validator'
import { inject, injectable } from 'tsyringe'
import { IBudgetService } from '../../services/interfaces/budget-service-interface'
import { CustomAPIResponse } from '../../utils/api-response'
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
      console.log(event.pathParameters)
      const response = await this.budgetService.delete(event.pathParameters?.id as string)

      return await this.customAPIResponse.success(response)
    } catch (error) {
      return await this.customAPIResponse.error({ error, event, context })
    }
  }
}

const budgetGetHandlerInstance = container.resolve(BudgetGetHandler)
const budgetGetHandler = budgetGetHandlerInstance.handler.bind(budgetGetHandlerInstance)

// add schemas validation for post requests
export const deleteBudget = middy()
  .use(
    validator({
      eventSchema: pathByIdSchema,
    }),
  )
  .handler(budgetGetHandler)
