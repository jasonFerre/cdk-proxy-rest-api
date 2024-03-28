/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { StatusCodes } from 'http-status-codes'
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

export interface CustomError extends Error {
  detail: unknown
}

@injectable()
export class CustomAPIResponse {
  private readonly headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  async success(data: unknown): Promise<APIGatewayProxyResult> {
    return Promise.resolve({
      statusCode: StatusCodes.OK,
      headers: this.headers,
      isBase64Encoded: false,
      body: JSON.stringify(data),
    })
  }

  async create(data: unknown, event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const id = (data as { Id?: string }).Id
    const locationHeader = id ? `${event.path}/${id}` : event.path

    return Promise.resolve({
      statusCode: StatusCodes.CREATED,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        location: locationHeader,
      },
      isBase64Encoded: false,
      body: JSON.stringify(data),
    })
  }

  async error(data: unknown): Promise<APIGatewayProxyResult> {
    console.log('detail error info')
    console.info(JSON.stringify(data, null, 2))

    const { error } = data as { error: unknown }
    const { event } = data as { event: APIGatewayEvent }
    const { context } = data as { context: Context }

    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    if (error && typeof error === 'object' && 'statusCode' in error) {
      statusCode = error.statusCode as StatusCodes
      delete error.statusCode
    }

    console.error(JSON.stringify(error, null, 2))

    return Promise.resolve({
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      isBase64Encoded: false,
      body: JSON.stringify({
        status: 'error',
        error: {
          ...(error as any),
          timestamp: new Date().toISOString(),
          path: event.path,
          suggestions: `see the logs for more details, log stream id: ${context.logStreamName}`,
        },
        requestId: context.awsRequestId,
      }),
    })
  }
}
