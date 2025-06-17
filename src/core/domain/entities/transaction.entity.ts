export class Transaction {
  public constructor(
    public id: string,
    public amount: number,
    public companyId: string,
    public debitAccount: string,
    public creditAccount: string,
    public transactionDate: Date,
  ) {}
}
