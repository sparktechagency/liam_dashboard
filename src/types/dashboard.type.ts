export interface TDashboardStats {
  totalUser: number;
  totalIncome: number;
  planStats: {
    basic: {
      income: number;
      userCount: number;
    };
    premium: {
      income: number;
      userCount: number;
    };
  };
  dailyService: {
    day: number;
    count: number;
  }[];
  mostUsedServices: any[]; // you can replace `any` with a proper type if you know the structure
  contractorCounts: {
    basic: number;
    premium: number;
  };
}
