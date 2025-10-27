
export type IContractor = {
    _id: string;
    fullName: string;
    email: string;
    contactNo: string;
    status: string;
    adminAccept: TApprovalStatus;
    contractor: {
        subscriptionStatus: string;
    }
}

export type IContratorDataSource = {
    key: number;
    serial: number;
    _id: string;
    fullName: string;
    email: string;
    contactNo: string;
    status: string;
    approvalStatus: TApprovalStatus;
    subscriptionStatus: string;
}


export type TApprovalStatus =  'pending' | 'approved' | 'rejected';


export interface IMaterial {
  _id: string
  name: string
  unit: string
  price: number
}