
export type IContractor = {
    _id: string;
    fullName: string;
    email: string;
    contactNo: string;
    status: string;
    adminAccept: TApprovalStatus;
    contractor: {
        _id: string;
        subscriptionStatus: string;
        isHomeSelect: boolean
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
    contractorId: string;
    isHomeSelect: boolean;
}


export type TApprovalStatus =  'pending' | 'approved' | 'rejected';


export interface IMaterial {
  _id: string
  name: string
  unit: string
  price: number
}