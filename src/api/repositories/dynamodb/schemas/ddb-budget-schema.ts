import { Entity } from 'dynamodb-toolbox'
import { apiSingleTable } from '../ddb-connection'

export const BudgetEntity = new Entity({
  name: 'Budget',
  attributes: {
    Id: { partitionKey: true, type: 'string' },
    SK: { hidden: true, sortKey: true, default: () => 'BUDGET' },
    Name: { type: 'string', required: true },
    OwnerEmail: { type: 'string', required: true },
    EndDate: { type: 'string', required: true },
    AmountValue: { type: 'number', required: true },
  },
  timestamps: true,
  table: apiSingleTable,
})
