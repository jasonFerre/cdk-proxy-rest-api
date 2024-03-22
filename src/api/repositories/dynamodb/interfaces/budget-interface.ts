import { BudgetEntity } from '../schemas/ddb-budget-schema'
import { IBaseDDBMethods } from './base-ddb-interface'

export interface IBudgetRepository extends IBaseDDBMethods<typeof BudgetEntity> {}
