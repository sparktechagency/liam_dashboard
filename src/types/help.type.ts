export interface IHelp {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    img: string;
  };
  title: string;
  details: string;
  isDeleted: boolean;
  adminMessage?: string; 
}


export interface IHelpDataSource {
    key: number;
    serial: number;
    _id: string;
    fullName: string;
    email: string;
    img: string;
    title: string;
    details: string;
    adminMessage: string;
}
