import {
  getBanksStart,
  getBanksSuccess,
  getBanksError,
  createBankStart,
  createBankSuccess,
  createBankError,
  updateBankStart,
  updateBankSuccess,
  updateBankError,
  deleteBankStart,
  deleteBankSuccess,
  deleteBankError
} from "./banksActions";
import { ApiBank } from "../../api";
import { Dispatch } from "redux";
import { Action } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { StateType } from "./banksReducer";
import { BankType } from "../../types";

type BanksPayload = {
  payload: () => BankType[];
};

export type ThunkType = ThunkAction<
  Promise<Array<BankType> | void | BankType>,
  StateType,
  unknown,
  Action<BanksPayload>
>;

export function getBanks(): ThunkType {
  return async function getEmployeesThunk(
    dispatch: Dispatch<Action<void> | Action<Array<BankType>>>
  ) {
    try {
      dispatch(getBanksStart());
      const banks = await ApiBank.fetchBanks();
      dispatch(getBanksSuccess(banks.data));
    } catch (error) {
      dispatch(getBanksError());
    }
  };
}

export function createBank(bank: BankType,): ThunkType {
  return async function createBankThunk(
    dispatch: Dispatch<Action<void> | Action<BankType>>,
    getState
  ) {
    try {
      dispatch(createBankStart());
      const data = await ApiBank.createBank(bank);
      
      console.log("GET STATE", getState())
      console.log('createBank', data);
      dispatch(createBankSuccess(data.data));
    } catch (error) {
      dispatch(createBankError());
    }
  };
}

export function updateBank(bank: BankType): ThunkType {
  return async function updateBankThunk(
    dispatch: Dispatch<Action<void> | Action<BankType>>
  ) {
    try {
      dispatch(updateBankStart());
      const data = await ApiBank.updateBank(String(bank._id), bank);
      console.log('updateBank', data);
      dispatch(updateBankSuccess(data.data));
    } catch (error) {
      dispatch(updateBankError());
    }
  };
}

export function deleteBank(_id: string): ThunkType {
  return async function deleteBankThunk(
    dispatch: Dispatch<Action<string | void> | Action<BankType>>
  ) {
    try {
      dispatch(deleteBankStart());
        const res =await ApiBank.deleteBank(_id);
        console.log('deleteBank', res);
      dispatch(deleteBankSuccess(_id))
    } catch (error) {
      dispatch(deleteBankError());
    }
  };
}
