import { handleActions, Action } from "redux-actions";
import {
  getBanksStart,
  getBanksSuccess,
  getBanksError,
  GetBanksSuccessPayload,
  CreateBankSuccessPayload,
  createBankStart,
  createBankSuccess,
  createBankError,
  CombinedPayloads,
  updateBankStart,
  updateBankSuccess,
  updateBankError,
  UpdateBankSuccessPayload,
  deleteBankStart,
  deleteBankSuccess,
  deleteBankError,
  DeleteBankSuccessPayload,
} from "./banksActions";
import { BankType } from "../../types";
 

// type LatestProductsType ={ 
//    items?: Array<BankType>
//    isLoading: boolean
//    isSuccess?: boolean
//    isError?: boolean | any
// }
// type ProductType = { 
//    item?: BankType | null
//    isLoading: boolean
//    isSuccess?: boolean
//    isError?: boolean | any
// }
export interface StateType {
    items: Array<BankType>
    isLoading: boolean
    isSuccess?: boolean
    isError?: boolean | null
}

const INITIAL_STATE: StateType = { 
    items: [],
    isLoading: false,
    isSuccess: false,
    isError: null,  
};

 const banksReducer = handleActions<StateType, CombinedPayloads>(
  {
    [getBanksStart.toString()]: (state): StateType => {
      return {
        ...state,
        isLoading: true,      
      };
    },

    [getBanksSuccess.toString()]: (state,  { payload }: Action<GetBanksSuccessPayload>): StateType => {
     
      return {
        ...state,  
          items: payload,
          isLoading: false,
          isSuccess: true       
      };
    },

    [getBanksError.toString()]: (state): StateType => {
      return {
        ...state, 
          isLoading: false,
          isError: null 
      };
    },


    [createBankStart.toString()]: (state): StateType => {
      console.log("createBankStart", state)
      return {
        ...state,    
        isLoading: true,
   
      };
    },

    [createBankSuccess.toString()]: (state,  { payload }:  Action<CreateBankSuccessPayload>): StateType => {
       //state.items.unshift(payload)
       // state.items.concat(payload)
      console.log('CreateBankSuccessPayload',)
  
      return {
        ...state,    
        items: [payload, ...state.items ],
        isLoading: false,
        isSuccess: true,
 
      };
    },

    [createBankError.toString()]: (state): StateType => {
      return {
        ...state,
   
          isLoading: false,
          isError: null,
    
      };
    },

    [updateBankStart.toString()]: (state): StateType => {
   
      return {
        ...state,    
        isLoading: true,
   
      };
    },

    [updateBankSuccess.toString()]: (state,  { payload }:  Action<UpdateBankSuccessPayload>): StateType => {
      return {
        ...state,
    
          items: state.items?.map(item => {
            if(item._id === payload._id) {
                item = payload
            }
            return item
          }),
          isLoading: false,
          isSuccess: true,
 
      };
    },

    [updateBankError.toString()]: (state): StateType => {
      return {
        ...state,   
          isLoading: false,
          isError: null,    
      };
    },


    [deleteBankStart.toString()]: (state): StateType => {
   
      return {
        ...state,    
        isLoading: true,
   
      };
    },

    [deleteBankSuccess.toString()]: (state,  { payload }:  Action<DeleteBankSuccessPayload>): StateType => {
      return {
        ...state,    
          items: state.items?.filter(item => item._id !== payload),
          isLoading: false,
          isSuccess: true,
 
      };
    },

    [deleteBankError.toString()]: (state): StateType => {
      return {
        ...state,   
          isLoading: false,
          isError: null,    
      };
    },
  },
  INITIAL_STATE
);

export default banksReducer;