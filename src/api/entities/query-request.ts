export interface IQueryRequest<T> {
  PageSize?: number
  Entity?: Partial<T>
  LastEvaluatedKey?: string
}
