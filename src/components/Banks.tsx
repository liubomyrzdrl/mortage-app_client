import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import { getBanks } from "../modules/banks/bankOperation";
import { BankType, RootStore } from "../types";
import TableBanksList from "./TableBanks/TableBanksList";



interface BanksListProps {
  get: any,
  isLoading: boolean;
  banks: Array<BankType>;
}

const BanksList: React.FC<BanksListProps> = ({ get, isLoading, banks }) => {
  useEffect(() => {
    get();
  }, [get]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log("Banks", banks);

  return (
    <Box>
      <TableBanksList {...{isLoading}} {...{banks}} />
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
};

export default connect(mapStateToProps, mapDispatchToState)(BanksList);
