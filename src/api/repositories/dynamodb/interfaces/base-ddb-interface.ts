import { FilterExpressions } from 'dynamodb-toolbox/dist/cjs/lib/expressionBuilder'

export interface IBaseDDBMethods<T> {
  getById(keys: { Id: string; SK: string }): Promise<unknown | void>
  create(item: T): Promise<unknown>
  update(item: T): Promise<unknown>
  delete(keys: { Id: string; SK: string }): Promise<void>
  scan(
    pageSize: number,
    lastEvaluatedKey: string | undefined,
    filters?: FilterExpressions | undefined,
  ): Promise<unknown>
}
