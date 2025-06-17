import { TransactionEntity } from '../entities/transaction.entity';

export const transactions = [
  {
    id: '34293b82-0a8b-4be4-8ca0-6954b8dc1bd1',
    amount: 1000,
    company: {
      id: '795eeb9c-f477-4e0a-9df7-9274f48a38f1',
    },
    creditAccount: '55555555555555555555',
    debitAccount: '66666666666666666666',
    transactionDate: new Date(),
  },
  {
    id: '9d006f66-58c6-4656-974a-48b5294696c9',
    amount: 700,
    company: {
      id: '795eeb9c-f477-4e0a-9df7-9274f48a38f1',
    },
    creditAccount: '66666666666666666666',
    debitAccount: '77777777777777777777',
    transactionDate: new Date(),
  },
  {
    id: '274b82c2-6378-4a1c-96f9-1d46c2566d8d',
    amount: 5600,
    company: {
      id: 'fe3570d5-5a36-45d8-a647-b4dea844eaf1',
    },
    creditAccount: '88888888888888888888',
    debitAccount: '44444444444444444444',
    transactionDate: new Date(),
  },
] as TransactionEntity[];
