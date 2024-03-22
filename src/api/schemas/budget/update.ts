import { transpileSchema } from '@middy/validator/transpile'

// used for get, update and delete by id
export const updateSchema = transpileSchema(
  {
    type: 'object',
    properties: {
      pathParameters: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            minLength: 1,
          },
        },
      },
      body: {
        type: 'object',
        properties: {
          Name: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
          },
          OwnerEmail: {
            type: 'string',
            format: 'email',
          },
          EndDate: {
            type: 'string',
            format: 'date-time',
          },
          AmountValue: {
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
