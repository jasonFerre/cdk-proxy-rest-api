import { IQueryRequest } from '../../entities/query-request'
import { IQueryResponse } from '../../entities/query-response'

/* eslint-disable no-unused-vars */
export interface IBaseService<T> {
  getById(id: string): Promise<T | void>
  create(item: T): Promise<T>
  update(id: string, item: Partial<T>): Promise<T | void>
  delete(id: string): Promise<void>
  GetAll(query: IQueryRequest<T>): Promise<IQueryResponse<T>>
}
