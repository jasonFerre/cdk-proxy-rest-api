import { transpileSchema } from '@middy/validator/transpile'

export const postSchema = transpileSchema(
  {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        required: ['Name', 'EndDate', 'OwnerEmail', 'AmountValue'],
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
