/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { IBudgetService } from './interfaces/budget-service-interface'
import { Budget } from '../entities/budget'
import { IBudgetRepository } from '../repositories/dynamodb/interfaces/budget-interface'
import { IQueryResponse } from '../entities/query-response'
import { IQueryRequest } from '../entities/query-request'

@injectable()
export class BudgetService implements IBudgetService {
  private SK = 'BUDGET'
  private PageSize = 50

  constructor(@inject('BudgetRepository') private budgetRepository: IBudgetRepository) {}

  async create(item: Budget): Promise<Budget> {
    try {
      const response = await this.budgetRepository.create(item as any)
      console.log(JSON.stringify(response))

      return response ? Budget.parse(response) : item
    } catch (error) {
      console.error('Error creating budget')
      throw error
    }
  }

  async GetAll(query: IQueryRequest<Budget>): Promise<IQueryResponse<Budget>> {
    try {
      let lastEvaluatedKey
      const pageSize = query?.PageSize ?? this.PageSize
      if (query?.LastEvaluatedKey) lastEvaluatedKey = { PK: query.LastEvaluatedKey, SK: this.SK } as any
      const filters = { attr: 'SK', eq: this.SK }

      const response = await this.budgetRepository.scan(pageSize, lastEvaluatedKey, filters)

      console.log('response', JSON.stringify(response))
      let { Items, ...queryAtt } = response as any
      Items = Budget.parseList(Items ?? [])

      return { Items, ...queryAtt }
    } catch (error) {
      console.info('Error quering budgets')
      throw error
    }
  }

  async getById(id: string): Promise<Budget | void> {
    try {
      const response = await this.budgetRepository.getById({ Id: id, SK: this.SK })
      console.log(JSON.stringify(response))

      return Budget.parse(response)
    } catch (error) {
      console.error('Error getting budget')
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await this.budgetRepository.delete({ Id: id, SK: this.SK })
      console.log(JSON.stringify(response))
    } catch (error) {
      console.error('Error deleting budget')
      throw error
    }
  }

  async update(id: string, item: Partial<Budget>): Promise<Budget | void> {
    try {
      const response = await this.budgetRepository.update({ Id: id, SK: this.SK, ...item } as any)
      console.log(JSON.stringify(response))

      return Budget.parse({ Id: id, ...item })
    } catch (error) {
      console.info('Error updating budget')
      throw error
    }
  }
}
