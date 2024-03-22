import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { Table } from 'dynamodb-toolbox'

const marshallOptions = {
  // Specify your client options as usual
  convertEmptyValues: false,
}

const translateConfig = { marshallOptions }

export const documentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' }),
  translateConfig,
)

// Create a Toolbox table
export const apiSingleTable = new Table({
  // Specify your table configuration
  name: 'budget-table',
  partitionKey: 'PK',
  sortKey: 'SK',
  // Add the DocumentClient
  DocumentClient: documentClient,
})

// Now you can use MyTable to perform operations
