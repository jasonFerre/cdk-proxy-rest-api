/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import { Entity } from 'dynamodb-toolbox'
import { injectable } from 'tsyringe'
import { IBaseDDBMethods } from './interfaces/base-ddb-interface'
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb'
import { StatusCodes } from 'http-status-codes'
import { RepositoryCustomError } from '../utils/repository-error-handler'
import { FilterExpressions } from 'dynamodb-toolbox/dist/cjs/lib/expressionBuilder'

@injectable()
export class BaseDDBMethods<T extends Entity> implements IBaseDDBMethods<T> {
  constructor(private entity: T) {}

  // todo transaction support

  async scan(pageSize: number, lastEvaluatedKey: any, filters?: FilterExpressions | undefined): Promise<unknown> {
    try {
      const response = await this.entity.scan({
        limit: Number(pageSize),
        startKey: lastEvaluatedKey,
        filters,
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { $metadata, ScannedCount, ...results } = response
      return results
    } catch (error) {
      console.info('Error into base repo scan method')
      console.error(error)
      throw error
    }
  }

  async create(item: T): Promise<unknown> {
    try {
      const response = await this.entity.put(item, {
        returnValues: 'ALL_OLD',
        conditions: [
          { attr: 'SK', exists: false },
          { attr: 'PK', exists: false },
        ],
        strictSchemaCheck: true,
        parse: true,
      })
      return response?.Item
    } catch (error) {
      console.info('Error into base repo put method')
      if (error instanceof ConditionalCheckFailedException) {
        throw new RepositoryCustomError(
          'Error creating item',
          'Unique item conditionals failed for the request.',
          StatusCodes.CONFLICT,
        )
      }
      throw error
    }
  }

  async getById(keys: { Id: string; SK: string }): Promise<unknown> {
    try {
      const response = await this.entity.get(keys, {
        consistent: true,
      })
      return (response as any).Item ?? {}
    } catch (error) {
      console.info('Error into base repo getById method')
      throw error
    }
  }

  async update(item: Partial<T>): Promise<unknown> {
    try {
      const response = await this.entity.update(item)
      return (response as any).Item ?? {}
    } catch (error) {
      console.info('Error into base repo update method')
      throw error
    }
  }

  async delete(keys: { Id: string; SK: string }): Promise<any> {
    try {
      const response = await this.entity.delete(keys, {
        conditions: [
          { attr: 'SK', exists: true },
          { attr: 'PK', exists: true },
        ],
      })
      return response
    } catch (error) {
      console.info('Error into base repo delete method')
      if (error instanceof ConditionalCheckFailedException) {
        throw new RepositoryCustomError(
          'Error deleting item',
          'Unique item conditionals failed for the request. Item not found',
          StatusCodes.PRECONDITION_FAILED,
        )
      }
      throw error
    }
  }
}
