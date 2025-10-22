
export interface ISubscription {
  _id: string;
  planType: string;
  price: number;
  duration: string;
  details: string[];
}

export interface ISubscriptionDataSource {
  key: number;
  serial:number;
  _id: string;
  planType: string;
  price: number;
  duration: string;
  details: string[];
}
