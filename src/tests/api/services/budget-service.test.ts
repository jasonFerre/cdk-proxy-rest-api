import container from '../../../ioc'
import { IBudgetRepository } from '../../../api/repositories/dynamodb/interfaces/budget-interface'
import { BudgetService } from '../../../api/services/budget-service'
import { IBudgetService } from '../../../api/services/interfaces/budget-service-interface'
import { Budget } from '../../../api/entities/budget'
import { jest } from '@jest/globals'

describe('budget service test suite', () => {
  const payload: Budget = new Budget({
    Id: '123',
    Name: 'Test Budget',
    OwnerEmail: 'geysonb04@hotmail.com',
    EndDate: new Date(),
    AmountValue: 1,
  })

  let sut: IBudgetService
  const budgetRepositoryMock = container.resolve<IBudgetRepository>('BudgetRepository')

  beforeEach(() => {
    jest.spyOn(console, 'info').mockImplementation(() => {})
    jest.spyOn(console, 'log').mockImplementation(() => {})
    sut = new BudgetService(budgetRepositoryMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create method', () => {
    it('must create a budget for a valid request and return an id', async () => {
      jest.spyOn(budgetRepositoryMock, 'create').mockImplementationOnce(() => Promise.resolve(payload))
      // Arrange
      const response = await sut.create(payload)
      expect(response.Id).toBe(payload.Id)
    })

    it('must return a budget when the repository response is undefined', async () => {
      jest.spyOn(budgetRepositoryMock, 'create').mockImplementationOnce(() => Promise.resolve(undefined))
      // Arrange
      const response = await sut.create(payload)
      expect(response).toBeInstanceOf(Budget)
    })

    it('must capture an exception when repository fail to save an object', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      jest.spyOn(budgetRepositoryMock, 'create').mockRejectedValueOnce(new Error('Error creating budget'))
      // Arrange
      expect(async () => {
        await sut.create(payload)
      }).rejects.toThrow('Error creating budget')
    })

    it('must log the captured exception', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      jest.spyOn(budgetRepositoryMock, 'create').mockRejectedValueOnce(new Error('Error creating budget'))
      const consoleSpy = jest.spyOn(console, 'error')
      // Arrange
      try {
        await sut.create(payload)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty('message', 'Error creating budget')
        expect(consoleSpy).toHaveBeenCalled()
        expect(consoleSpy).toHaveBeenCalledWith('Error creating budget')
        expect(consoleSpy).toHaveBeenCalledTimes(1)
      }
    })
  })

  describe('GetAll method', () => {
    it('must return a list of budgets for a valid request', async () => {
      jest
        .spyOn(budgetRepositoryMock, 'scan')
        .mockImplementationOnce(() => Promise.resolve({ Items: [payload], Count: 1 }))
      // Arrange
      const response = await sut.GetAll({})
      expect(response.Items).toBeInstanceOf(Array)
      if (response.Items) {
        expect(response.Items).toBeInstanceOf(Array)
        expect(response.Items[0]).toBeInstanceOf(Budget)
      }
    })

    it('must call the scan method of the repository with the correct parameters', async () => {
      const scanSpy = jest
        .spyOn(budgetRepositoryMock, 'scan')
        .mockImplementationOnce(() => Promise.resolve({ Items: [payload], Count: 1 }))
      // Arrange
      await sut.GetAll({ PageSize: 10, LastEvaluatedKey: '123' })
      expect(scanSpy).toHaveBeenCalledWith(10, { PK: '123', SK: 'BUDGET' }, { attr: 'SK', eq: 'BUDGET' })
    })

    it('must return an empty list when there is no item storaged', async () => {
      jest.spyOn(budgetRepositoryMock, 'scan').mockImplementationOnce(() => Promise.resolve([]))
      // Arrange
      const response = await sut.GetAll({})
      expect(response.Items).toEqual([])
    })

    it('must capture and throw exception for repository failures', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      jest.spyOn(budgetRepositoryMock, 'scan').mockRejectedValueOnce(new Error('Error quering budgets'))
      // Arrange
      expect(async () => {
        await sut.GetAll({})
      }).rejects.toThrow('Error quering budgets')
    })

    it('must capture and log exception for failures in the budget parse', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      jest.spyOn(budgetRepositoryMock, 'scan').mockImplementationOnce(() => Promise.resolve([]))
      jest.spyOn(Budget, 'parseList').mockImplementationOnce(() => {
        throw new Error('Simulated parse error')
      })
      // Arrange
      expect(async () => {
        await sut.GetAll({})
      }).rejects.toThrow('Simulated parse error')
    })
  })

  describe('getById method', () => {
    it('must return a budget for a found item', async () => {
      jest.spyOn(budgetRepositoryMock, 'getById').mockImplementationOnce(() => Promise.resolve(payload))
      // Arrange
      const response = await sut.getById(payload.Id)
      expect(response).toBeInstanceOf(Budget)
    })

    it('must return an empty object for a not found id', async () => {
      jest.spyOn(budgetRepositoryMock, 'getById').mockImplementationOnce(() => Promise.resolve({}))
      // Arrange
      const response = await sut.getById('')
      expect(response).toEqual({})
    })

    it('must capture and throw exception for repository failures', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      jest.spyOn(budgetRepositoryMock, 'getById').mockRejectedValueOnce(new Error('Error getting budget'))
      // Arrange
      expect(async () => {
        await sut.getById(payload.Id)
      }).rejects.toThrow('Error getting budget')
    })

    it('must capture and log exception for failures in the budget parse', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      jest.spyOn(budgetRepositoryMock, 'getById').mockImplementationOnce(() => Promise.resolve({}))
      jest.spyOn(Budget, 'parse').mockImplementationOnce(() => {
        throw new Error('Simulated parse error')
      })
      // Arrange
      expect(async () => {
        await sut.getById(payload.Id)
      }).rejects.toThrow('Simulated parse error')
    })
  })

  describe('delete method', () => {
    it('should call the delete method of the repository with the correct parameters', async () => {
      const id = '123'
      const spy = jest.spyOn(budgetRepositoryMock, 'delete').mockResolvedValue()

      await sut.delete(id)

      expect(spy).toHaveBeenCalledWith({ Id: id, SK: 'BUDGET' })
    })

    it('should throw an error when the repository throws an error', async () => {
      // Arrange
      const id = '123'
      const error = new Error('Repository error')
      jest.spyOn(budgetRepositoryMock, 'delete').mockRejectedValueOnce(error)

      // Act and Assert
      await expect(sut.delete(id)).rejects.toThrow('Repository error')
    })
  })

  describe('update method', () => {
    it('should call the update method of the repository with the correct parameters', async () => {
      const { Id, ...item } = payload
      const spy = jest.spyOn(budgetRepositoryMock, 'update').mockResolvedValueOnce(item)

      await sut.update(Id, item)

      expect(spy).toHaveBeenCalledWith({ Id, SK: 'BUDGET', ...item })
    })

    it('should return a Budget for a valid request', async () => {
      const { Id, ...item } = payload
      jest.spyOn(budgetRepositoryMock, 'update').mockResolvedValueOnce(item)

      const response = await sut.update(Id, item)

      expect(response).toBeInstanceOf(Budget)
    })

    it('should throw an error when the repository throws an error', async () => {
      // Arrange
      const id = '123'
      const error = new Error('Repository error')
      jest.spyOn(budgetRepositoryMock, 'update').mockRejectedValueOnce(error)

      // Act and Assert
      await expect(sut.update(id, payload)).rejects.toThrow('Repository error')
    })
  })
})
