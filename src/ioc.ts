import 'reflect-metadata'
import { container } from 'tsyringe'
import { IBudgetService } from './api/services/interfaces/budget-service-interface'
import { BudgetService } from './api/services/budget-service'
import { BudgetRepository } from './api/repositories/dynamodb/budget-repository'
import { IBudgetRepository } from './api/repositories/dynamodb/interfaces/budget-interface'

// services
container.register<IBudgetService>('BudgetService', { useClass: BudgetService })
container.register<IBudgetRepository>('BudgetRepository', { useClass: BudgetRepository })

export default container
