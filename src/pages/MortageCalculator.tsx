import React, { useState, useEffect } from "react";
import { Box, TextField, makeStyles, Button, Icon } from "@material-ui/core";
import Layout from "../components/Layout";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { BankType, RootStore } from "../types";
import { getBanks } from "../modules/banks/bankOperation";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

interface MortageCalculatorPropsType {
  get: any;
  isLoading: boolean;
  banks: Array<BankType>;
}


const MortageCalculator: React.FC<MortageCalculatorPropsType> = ({
  banks,
  isLoading,
  get,
}) => {
  const [bank, setBank] = useState("")
  const [mLoan, setMLoan] = useState()
  const [mPaymant, setMPaymant] = useState()
  const [mortageMonthPay, setMortageMonthPay] = useState(0)

  const classes = useStyles();

  console.log("Banks", banks);

  useEffect(() => {
    if (banks.length === 0) {
      get();
    }
  }, [banks.length, get]);

  if (isLoading) {
    return <Layout>...Loading</Layout>;
  }

  function handleChange(e) {
    console.log("Event Bank", e.target.value);
    setBank(e.target.value);
    const filteredBank = banks.find(b => b.name === e.target.value)
    setMLoan(filteredBank.maxLoan)
    setMPaymant(filteredBank.minPaymant)

  }

  function handleMaxLoan(e) {
    setMLoan(e.target.value);
  }

  function handleMinPaymant(e) {
    setMPaymant(e.target.value);
  }
  return (
    <Layout>
      <Box>
        <TextField
          id="standard-select-currency"
          select
          value={bank}
          label="Select Bank"
          onChange={handleChange}
          helperText="Please select your bank"
        >
          {banks.map((option) => (
            <MenuItem key={option._id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-size-small"
            value={mLoan ? mLoan : ""}
          //   error={mLoan === 0}
          //   helperText={ mLoan === 0 && "Empty input is not allowed"}
          type="number"
          label="Max loan"
          InputProps={{
            inputProps: {
              min: 0,
              style: {
                textAlign: "center",
              },
            },
          }}
          placeholder="max loan"
          size="small"
          rowsMax={4}
          helperText="Max loan"
          onChange={handleMaxLoan}
        />

        <TextField
          id="standard-size-small"
            value={mPaymant ? mPaymant : ""}
          //   error={mPaymant === 0}
          //   helperText={ mPaymant === 0 && "Empty input is not allowed"}
          label="Down pay"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
              style: {
                textAlign: "center",
              },
            },
          }}
          placeholder="min down pay"
          size="small"
          onChange={handleMinPaymant}
          helperText="down pay"
        />
      </Box>
      <Box>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddIcon />}
      >
       Calculate
      </Button>
        <Box>Mortage month payment: {mortageMonthPay}</Box>
      </Box>
    </Layout>
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

export default connect(mapStateToProps, mapDispatchToState)(MortageCalculator);
