import { createStore, applyMiddleware, Store, CombinedState } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "../modules";
import { Action } from "redux-actions";
import { GetBanksSuccessPayload } from "../modules/banks/banksActions";
import { StateType } from "../modules/banks/banksReducer";

export type MainStoreType = Store<
  CombinedState<{ banksReducer: StateType }>,
  Action<GetBanksSuccessPayload>
>;

const store = createStore(reducer, applyMiddleware(thunk, logger));

export const useStore = () => store;

export default store;
