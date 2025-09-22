

export type IAuthUser = {
  id: string;
  iat: number;
  email: string;
  role: "customer" | "superAdmin";
};

export interface IParam {
  name: string;
  value: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}


export interface IApiError {
  error: {
    status: number;
    data: {
      message: string;
    }
  }
}
  

export type TPolicy = {
    description: string;
}