import { Route } from '@middy/http-router'
import { APIGatewayProxyEvent } from 'aws-lambda'
import * as budget from './handlers/budget'

export const routes: Route<APIGatewayProxyEvent>[] = [
  {
    method: 'POST',
    path: '/budget',
    handler: budget.postBudget,
  },
  {
    method: 'GET',
    path: '/budget',
    handler: budget.getBudget,
  },
  {
    method: 'GET',
    path: '/budget/{id}',
    handler: budget.getByIdBudget,
  },
  {
    method: 'PUT',
    path: '/budget/{id}',
    handler: budget.updateBudget,
  },
  {
    method: 'DELETE',
    path: '/budget/{id}',
    handler: budget.deleteBudget,
  },
]
