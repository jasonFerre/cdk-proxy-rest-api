export class Budget {
  Id: string
  Name: string
  OwnerEmail: string
  EndDate: Date
  AmountValue: number

  constructor(data: Budget) {
    this.Id = data.Id
    this.Name = data.Name
    this.OwnerEmail = data.OwnerEmail
    this.EndDate = data.EndDate
    this.AmountValue = data.AmountValue
  }

  static parse(data: unknown): Budget {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid data')
    }

    const { Id, Name, OwnerEmail, EndDate, AmountValue } = data as Budget
    return new Budget({ Id, Name, OwnerEmail, EndDate, AmountValue })
  }

  static parseList(data: unknown[]): Budget[] {
    if (!Array.isArray(data)) {
      throw new Error('Invalid data')
    }
    return data.map(item => Budget.parse(item))
  }
}
