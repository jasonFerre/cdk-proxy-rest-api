import 'reflect-metadata'
import { BaseDDBMethods } from './base-ddb-repository'
import { IBudgetRepository } from './interfaces/budget-interface'
import { injectable } from 'tsyringe'
import { BudgetEntity } from './schemas/ddb-budget-schema'

@injectable()
export class BudgetRepository extends BaseDDBMethods<typeof BudgetEntity> implements IBudgetRepository {
  constructor() {
    super(BudgetEntity)
  }
}
