
export interface ISubscription {
  slNo: number;
  subscriptionPlan: string;
  price: string;
  duration: string;
  contractorFeePerMonth: string;
}

export interface ISubscriptionDataSource {
  key: number;
  slNo: number;
  subscriptionPlan: string;
  price: string;
  duration: string;
  contractorFeePerMonth: string;
}
