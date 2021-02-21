import { BankType } from "../../types";


export const banksReducer = (state: Array<BankType> = [], action: any)=>{
    console.log("banksReducer", state)
    switch(action.type){
        case 'GET_BANKS': return Object.assign([], state, action.payload.data);
        case 'ADD_BANK': return Object.assign([], state, action.payload);
        
        default: return state;
    }
}
   