import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import { getBanks, createBank, updateBank, deleteBank, ThunkType } from "../modules/banks/bankOperation";
import { BankType, RootStore } from "../types";
import TableBanksList from "./TableBanks/TableBanksList";



interface BanksListProps {
  get: any
  isLoading: boolean
  banks: Array<BankType>
  createBank: any
  updateBank: any
  deleteBank: any
}

const BanksList: React.FC<BanksListProps> = ({ get, isLoading, banks, createBank, updateBank, deleteBank}) => {
  useEffect(() => {
    get();
  }, [get]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log("Banks", banks);
  

  return (
    <Box>
      <TableBanksList {...{isLoading}} {...{banks}} {...{createBank}} {...{updateBank}} {...{deleteBank}} />
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
  deleteBank
};

export default connect(mapStateToProps, mapDispatchToState)(BanksList);
