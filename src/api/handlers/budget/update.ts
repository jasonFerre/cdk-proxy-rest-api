import 'reflect-metadata'
import container from '../../../ioc'
import middy from '@middy/core'
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import validator from '@middy/validator'
import { inject, injectable } from 'tsyringe'
import { IBudgetService } from '../../services/interfaces/budget-service-interface'
import { CustomAPIResponse } from '../../utils/api-response'
import { updateSchema } from '../../schemas/budget/update'

@injectable()
export class BudgetUpdateHandler {
  constructor(
    @inject('BudgetService')
    protected budgetService: IBudgetService,

    @inject(CustomAPIResponse)
    protected customAPIResponse: CustomAPIResponse,
  ) {}

  async handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
      const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
      console.log({ ...event.pathParameters, ...body })
      const response = await this.budgetService.update(event.pathParameters?.id as string, body)

      return await this.customAPIResponse.success(response)
    } catch (error) {
      return this.customAPIResponse.error({ error, event, context })
    }
  }
}

const budgetUpdateHandlerInstance = container.resolve(BudgetUpdateHandler)
const budgetUpdateHandler = budgetUpdateHandlerInstance.handler.bind(budgetUpdateHandlerInstance)

// add schemas validation for post requests
export const updateBudget = middy()
  .use(
    validator({
      eventSchema: updateSchema,
    }),
  )
  .handler(budgetUpdateHandler)
