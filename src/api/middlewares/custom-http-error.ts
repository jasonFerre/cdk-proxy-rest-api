import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CustomAPIResponse, CustomError } from '../utils/api-response'

const errorCustomResponse = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<void> => {
    const { event, context } = request

    const error: CustomError = request.error as CustomError
    if (error && 'cause' in error) error.detail = (error.cause as { data: unknown }).data

    const apiResponse = new CustomAPIResponse()
    request.response = await apiResponse.error({ error, event, context })
  }

  return {
    onError,
  }
}

export default errorCustomResponse
