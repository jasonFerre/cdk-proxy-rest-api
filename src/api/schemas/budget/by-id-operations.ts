import { transpileSchema } from '@middy/validator/transpile'

// used for get, update and delete by id
export const pathByIdSchema = transpileSchema(
  {
    type: 'object',
    properties: {
      pathParameters: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            minLength: 36,
            maxLength: 36,
          },
        },
      },
    },
  },
  {
    verbose: true,
  },
)
