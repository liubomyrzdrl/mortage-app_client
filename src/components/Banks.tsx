import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import {
  getBanks,
  createBank,
  updateBank,
  deleteBank,
} from "../modules/banks/bankOperation";
import { BankType, RootStore } from "../types";
import TableBanksList from "./TableBanks/TableBanksList";

interface BanksListPropsType {
  get: any;
  isLoading: boolean;
  banks: Array<BankType>;
  createBank:(bank: BankType) => Promise<boolean>;
  updateBank: (bank: BankType) => Promise<boolean>;
  deleteBank: (_id: string) => Promise<boolean>;
}

const BanksList: React.FC<BanksListPropsType> = ({
  get,
  isLoading,
  banks,
  createBank,
  updateBank,
  deleteBank,
}) => {
  useEffect(() => {
    get();
  }, [get]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Box>
      <TableBanksList
        {...{ isLoading }}
        {...{ banks }}
        {...{ createBank }}
        {...{ updateBank }}
        {...{ deleteBank }}
      />
    </Box>
  );
};
const mapStateToProps = (state: RootStore) => {
  return {
    banks: state.banksReducer.items,
    isLoading: state.banksReducer.isLoading,
  };
};

const mapDispatchToState = {
  get: getBanks,
  createBank,
  updateBank,
  deleteBank,
};

export default connect(mapStateToProps, mapDispatchToState)(BanksList);
