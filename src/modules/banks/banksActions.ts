import { createAction  } from 'redux-actions';
import { BankType } from '../../types';

const GET_BANKS_START = 'GET_BANKS_START'
const GET_BANKS_SUCCESS = 'GET_BANKS_SUCCESS'
const GET_BANKS_ERROR = 'GET_BANKS_ERROR'

export type createBankSuccessPayload =  BankType

export type getBanksStartPayload =  void 
export type getBanksSuccessPayload =  Array<BankType>
export type getBanksErrorPayload = void


//export type BanksPayload =   getBanksSuccessPayload 
export type BanksPayload =   getBanksSuccessPayload
 
 
export const getBanksStart = createAction<getBanksStartPayload>(GET_BANKS_START);
export const getBanksSuccess = createAction<getBanksSuccessPayload>(GET_BANKS_SUCCESS);
export const getBanksError = createAction(GET_BANKS_ERROR);

export const createBankStart = createAction<void>('CREATE_BANK_START');
export const createBankSuccess = createAction<createBankSuccessPayload>('CREATE_BANK_SUCCESS');
export const createBankError = createAction<void>('CREATE_BANK_ERROR');

export const updateBankStart = createAction('UPDATE_BANK_START');
export const updateBankSuccess = createAction('UPDATE_BANK_SUCCESS');
export const updateBankError = createAction('UPDATE_BANK_ERROR');

export const deleteBankStart = createAction('DELETE_BANK_START');
export const deleteBankSuccess = createAction('DELETE_BANK_SUCCESS');
export const deleteBankError = createAction('DELETE_BANK_ERROR');