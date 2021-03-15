import { handleActions } from "redux-actions";
import {
  getBanksStart,
  getBanksSuccess,
  getBanksError,
  getBanksSuccessPayload,
  BanksPayload,
} from "./banksActions";
import { BankType } from "../../types";
 


export interface StateType {
  items: Array<BankType>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean | any
}

const INITIAL_STATE: StateType = {
  items: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
};

 const banksReducer = handleActions<StateType, BanksPayload>(
  {
    [getBanksStart.toString()]: (state): StateType => {
      return {
        ...state,
        isLoading: true,
      };
    },

    [getBanksSuccess.toString()]: (state,  action ): StateType => {
 
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    },

    [getBanksError.toString()]: (state): StateType => {
      return {
        ...state,
        isError: null,
      };
    },
  },
  INITIAL_STATE
);

export default banksReducer;