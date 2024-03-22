import { transpileSchema } from '@middy/validator/transpile'

// used for get, update and delete by id
export const getAll = transpileSchema(
  {
    type: 'object',
    properties: {
      queryStringParameters: {
        type: 'object',
        required: ['PageSize', 'LastEvaluatedKey'],
        properties: {
          LastEvaluatedKey: {
            type: 'string',
            minLength: 36,
            maxLength: 36,
          },
          PageSize: {
            type: 'number',
            minimum: 1,
          },
        },
      },
    },
  },
  {
    verbose: true,
  },
)
