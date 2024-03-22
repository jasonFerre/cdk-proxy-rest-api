export interface IQueryResponse<T> {
  Count: number
  Items: T[] | undefined
  LastEvaluatedKey?: string
}
