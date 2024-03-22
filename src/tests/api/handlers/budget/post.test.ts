import 'reflect-metadata'
import { budegtRequest } from './api-request-helper'
import { handler as postBudget } from '../../../../api/proxy-handler'
import { Context } from 'aws-lambda'
import { jest } from '@jest/globals'
import { Budget } from '../../../../api/entities/budget'
import { BudgetService } from '../../../../api/services/budget-service'

describe('budget post handler test suite', () => {
  // valid payload
  const payload = {
    Name: 'Test Budget',
    OwnerEmail: 'geysonb04@hotmail.com',
    EndDate: new Date(),
    AmountValue: 1,
  }

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'info').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('must create a budget for a valid request and return an id', async () => {
    budegtRequest.body = JSON.stringify(payload)
    const event = budegtRequest

    // Mock the create method of BudgetService
    const mockBudget: Budget = { Id: '123', ...payload }
    jest.spyOn(BudgetService.prototype, 'create').mockImplementation(() => Promise.resolve(mockBudget))

    const result = await postBudget(event, {} as Context)
    const budget = JSON.parse(result.body) as Budget

    expect(budget.Id).toBeDefined()
    expect(budget.Name).toBe(payload.Name)
  })

  it('must return a 201 status code for a valid request', async () => {
    const ctx = {} as Context

    budegtRequest.body = JSON.stringify(payload)
    const event = budegtRequest

    // Mock the create method of BudgetService
    const mockBudget: Budget = { Id: '123', ...payload }
    jest.spyOn(BudgetService.prototype, 'create').mockImplementation(() => Promise.resolve(mockBudget))

    const response = await postBudget(event, ctx)
    expect(response.statusCode).toBe(201)
  })

  it('must return a 400 status code for a invalid request', async () => {
    const ctx = {} as Context

    payload.AmountValue = 0
    budegtRequest.body = JSON.stringify(payload)
    const event = budegtRequest

    const response = await postBudget(event, ctx)
    expect(response.statusCode).toBe(400)
  })

  it('must return a 500 status code for an excption', async () => {
    const ctx = {} as Context
    payload.AmountValue = 1
    budegtRequest.body = JSON.stringify(payload)
    const event = budegtRequest

    // Mock the create method of BudgetService
    jest.spyOn(BudgetService.prototype, 'create').mockRejectedValueOnce({})

    const response = await postBudget(event, ctx)
    expect(response.statusCode).toBe(500)
  })
})
