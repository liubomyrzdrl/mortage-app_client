import rootReducer from './modules/index'
 
export interface BankType {
    _id?: string;
    name: string;
    intrestRate: number;
    maxLoan: number;
    minPaymant: number;
    loanTerm: number;
}

type RootReducer = typeof rootReducer

export type RootStore = ReturnType<RootReducer>