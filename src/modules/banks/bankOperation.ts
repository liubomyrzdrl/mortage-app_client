import { getBanksStart, getBanksSuccess, getBanksError } from './banksActions';
import { ApiBank } from '../../api';
import { Dispatch  } from 'redux';
import { Action } from 'redux-actions'
import { ThunkAction } from 'redux-thunk';
import { StateType } from './banksReducer';
import { BankType } from '../../types';

type BanksPayload = {
   payload: () => BankType[]
}

export type ThunkType = ThunkAction<Promise<Array<BankType> | void>, StateType, unknown, Action<BanksPayload>>

export function getBanks(): ThunkType {
  return async function getEmployeesThunk(dispatch: Dispatch<Action<void> | Action<Array<BankType>>>){
     try {
        dispatch(getBanksStart()); 
        const banks = await ApiBank.fetchBanks();   
        dispatch(getBanksSuccess(banks.data));     
     } catch (error) {
         dispatch(getBanksError());
     }
   };
};  

