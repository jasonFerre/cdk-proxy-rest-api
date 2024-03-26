import { Context, APIGatewayTokenAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function event(event: APIGatewayTokenAuthorizerEvent, context: Context): Promise<CustomAuthorizerResult> {
  const token = tokenValidation(event.authorizationToken.split(' ')[1])

  if (token === 'allow') {
    return generatePolicy('user', 'Allow', event.methodArn)
  } else if (token === 'deny') {
    return generatePolicy('user', 'Deny', event.methodArn)
  } else {
    throw new Error('Unauthorized') // Returns a 401 Unauthorized response
  }
}

function tokenValidation(token: string): string {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const formattedDate = `${day}-${month}-${year}`
  if (token.startsWith(formattedDate, 0)) {
    return 'allow'
  }

  return 'deny'
}

const generatePolicy = (principalId: string, effect: string, resource: string): CustomAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  }
}
