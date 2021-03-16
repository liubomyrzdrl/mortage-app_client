import { createAction } from "redux-actions";
import { BankType } from "../../types";

const GET_BANKS_START = "GET_BANKS_START";
const GET_BANKS_SUCCESS = "GET_BANKS_SUCCESS";
const GET_BANKS_ERROR = "GET_BANKS_ERROR";

export type GetBanksSuccessPayload = Array<BankType>;
export type CreateBankSuccessPayload = BankType;
export type UpdateBankSuccessPayload = BankType;
export type DeleteBankSuccessPayload = string;

export type CombinedPayloads =  GetBanksSuccessPayload & CreateBankSuccessPayload  & UpdateBankSuccessPayload & DeleteBankSuccessPayload

export const getBanksStart = createAction<void>(GET_BANKS_START);
export const getBanksSuccess = createAction<GetBanksSuccessPayload>(
  GET_BANKS_SUCCESS
);
export const getBanksError = createAction<void>(GET_BANKS_ERROR);

export const createBankStart = createAction<void>("CREATE_BANK_START");
export const createBankSuccess = createAction<CreateBankSuccessPayload>(
  "CREATE_BANK_SUCCESS"
);
export const createBankError = createAction<void>("CREATE_BANK_ERROR");

export const updateBankStart = createAction<void>("UPDATE_BANK_START");
export const updateBankSuccess = createAction<UpdateBankSuccessPayload>(
  "UPDATE_BANK_SUCCESS"
);
export const updateBankError = createAction<void>("UPDATE_BANK_ERROR");

export const deleteBankStart = createAction<void>("DELETE_BANK_START");
export const deleteBankSuccess = createAction<DeleteBankSuccessPayload>(
  "DELETE_BANK_SUCCESS"
);
export const deleteBankError = createAction<void>("DELETE_BANK_ERROR");
