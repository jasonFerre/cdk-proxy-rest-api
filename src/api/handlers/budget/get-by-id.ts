import 'reflect-metadata'
import middy from '@middy/core'
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { pathByIdSchema } from '../../schemas/budget/by-id-operations'
import validator from '@middy/validator'
import container from '../../../ioc'
import { inject, injectable } from 'tsyringe'
import { CustomAPIResponse } from '../../utils/api-response'
import { IBudgetService } from '../../services/interfaces/budget-service-interface'

@injectable()
export class BudgetGetHandler {
  constructor(
    @inject('BudgetService')
    protected budgetService: IBudgetService,

    @inject(CustomAPIResponse)
    protected customAPIResponse: CustomAPIResponse,
  ) {}

  async handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
      console.log(event.pathParameters)
      const response = await this.budgetService.getById(event.pathParameters?.id as string)

      return await this.customAPIResponse.success(response)
    } catch (error) {
      return await this.customAPIResponse.error({ error, event, context })
    }
  }
}

const budgetPostHandlerInstance = container.resolve(BudgetGetHandler)
const budgetPostHandler = budgetPostHandlerInstance.handler.bind(budgetPostHandlerInstance)
// add schemas validation for post requests
export const getByIdBudget = middy()
  .use(
    validator({
      eventSchema: pathByIdSchema,
    }),
  )
  .handler(budgetPostHandler)
