
export type IWithdraw = {
    _id: string;
    userId: {
        _id: string;
        fullName: string;
        email: string;
        img: string;
    }
    payoutId: string;
    amount: number;
    date: string; 
    status: "received" | "pending" | "failed"; 
    updatedAt: string; 
    __v: number;
};
