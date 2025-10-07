export interface ITransaction {
  serial: string;
  photo: string;
  name: string;
  contractorType: string;
  dateOfPayment: string;
  paymentType: string;
  paymentStatus: string;
  paidAmount: string;
}

export interface ITransactionDataSource {
  key: number;
  serial: string;
  name: string;
  contractorType: string;
  dateOfPayment: string;
  paymentType: string;
  paymentStatus: string;
  paidAmount: string;
}

export type TPaymentStatus = "Paid" | "Failed"