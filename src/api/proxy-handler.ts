import middy from '@middy/core'
import httpRouterHandler from '@middy/http-router'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import { routes } from './router'
import httpErrorHandler from '@middy/http-error-handler'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpEventNormalizer from '@middy/http-event-normalizer'
import errorCustomResponse from './middlewares/custom-http-error'

export const handler = middy()
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser({ disableContentTypeError: true }))
  .use(httpErrorHandler())
  .use(httpEventNormalizer())
  .use(errorCustomResponse())
  .handler(httpRouterHandler(routes))
