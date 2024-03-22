import 'reflect-metadata'
import middy from '@middy/core'
import validator from '@middy/validator'
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { postSchema } from '../../schemas/budget/post'
import container from '../../../ioc'
import { IBudgetService } from '../../services/interfaces/budget-service-interface'
import { inject, injectable } from 'tsyringe'
import { CustomAPIResponse } from '../../utils/api-response'

@injectable()
export class BudgetPostHandler {
  constructor(
    @inject('BudgetService')
    protected budgetService: IBudgetService,

    @inject(CustomAPIResponse)
    protected customAPIResponse: CustomAPIResponse,
  ) {}

  async handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
      console.log(event.body)
      const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
      const response = await this.budgetService.create({
        Id: context.awsRequestId,
        ...body,
      })

      return await this.customAPIResponse.create(response, event)
    } catch (error) {
      return await this.customAPIResponse.error({ error, event, context })
    }
  }
}

const budgetPostHandlerInstance = container.resolve(BudgetPostHandler)
const budgetPostHandler = budgetPostHandlerInstance.handler.bind(budgetPostHandlerInstance)

export const postBudget = middy()
  .use(
    validator({
      eventSchema: postSchema,
    }),
  )
  .handler(budgetPostHandler)
