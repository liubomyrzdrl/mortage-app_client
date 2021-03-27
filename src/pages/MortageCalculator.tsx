import React, { useState, useEffect } from "react";
import { Box, TextField, makeStyles, Button } from "@material-ui/core";
import Layout from "../components/Layout";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { BankType, RootStore } from "../types";
import { getBanks } from "../modules/banks/bankOperation";
import AddIcon from "@material-ui/icons/Add";
import MonthPaymantTable from "../components/MonthPaymantTable";
import "../scss/style.scss";

import { wrap } from "module";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

interface MortageCalculatorPropsType {
  get: () => Promise<Array<BankType>>
  isLoading: boolean
  banks: Array<BankType>
}

const MortageCalculator: React.FC<MortageCalculatorPropsType> = ({
  banks,
  isLoading,
  get,
}) => {
  const [bank, setBank] = useState("");
  const [mLoan, setMLoan] = useState();
  const [mPaymant, setMPaymant] = useState();
  const [iRate, setIntrestRate] = useState<number>();
  const [lTerm, setLoanTerm] = useState<number>();
  const [mortageMonthPay, setMortageMonthPay] = useState(0);
  const [intrestRange, setIntrestRange] = useState([]);
  const [equetyRange, setEquetyRange] = useState([]);
  const [loanBalanceRange, setLoanBalanceRange] = useState([]);
  const [isShowMortagePaymant, setIShowMortagePaymant] = useState(false);

  let intrestRateNumber = iRate / 100;
  let nPer = lTerm * 12;
  let intrestMonthly = intrestRateNumber / 12;
  let MAX = mLoan + mPaymant;
  const classes = useStyles();

  useEffect(() => {
    if (banks.length === 0) {
      get();
    }
  }, [banks.length, get]);

  if (isLoading) {
    return <Layout>...Loading</Layout>;
  }

  function calculateMortage() {
    let intrestMonthlyPlus = 1 + intrestMonthly;
    let powIntrestMonth = Math.pow(intrestMonthlyPlus, nPer);
    let numerator = mLoan * intrestMonthly * powIntrestMonth;

    let denominator = Math.pow(1 + intrestMonthly, nPer) - 1;

    let payment = numerator / denominator;
    setMortageMonthPay(Number(payment.toFixed(2)));
    calcTable(payment.toFixed(2));
    setIShowMortagePaymant(!isShowMortagePaymant);
  }
  function calcTable(mortagePayment) {
    let loanBalance = mLoan;

    let arr = [];
    let equty = [];
    let loan = [];
    while (loanBalance > 0) {
      let res = loanBalance * intrestMonthly;
      arr.push(res);
      equty.push(MAX - loanBalance);

      loanBalance = loanBalance - Number(mortagePayment) + res;
      if (loanBalance > 0) {
        loan.push(loanBalance);
      }
    }
    setIntrestRange(arr);
    setLoanBalanceRange(loan);
    setEquetyRange(equty.slice(1, equty.length));
  }

  function handleChange(e) {
    setBank(e.target.value);
    const filteredBank = banks.find((b) => b.name === e.target.value);
    setMLoan(filteredBank.maxLoan);
    setMPaymant(filteredBank.minPaymant);
    setIntrestRate(filteredBank.intrestRate);
    setLoanTerm(filteredBank.loanTerm);
    setIShowMortagePaymant(false);
  }

  function handleMaxLoan(e) {
    setMLoan(e.target.value);
  }

  function handleMinPaymant(e) {
    setMPaymant(e.target.value);
  }
  return (
    <Layout>
      <Box  >
        <Box display="flex" className="mortage-table-container" >
          <Box mr={3} mb={3}>
            <TextField
              id="standard-select-currency"
              select
              value={bank}
              variant="outlined"
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
          </Box>
          {bank !== "" && (
            <Box
              display="flex"
              className="mortage-table-container_data"
              justifyContent="space-between"
              width={"70%"}
              flexWrap={wrap}
            >
              <Box mb={3}>
                <TextField
                  id="standard-size-small"
                  value={mLoan ? mLoan : ""}
                  variant="outlined"
                  type="number"
                  label="Max loan"
                  InputProps={{
                    inputProps: {
                      readOnly: true,
                    },
                  }}
                  placeholder="max loan"
                  size="small"
                  rowsMax={4}
                  helperText="Max loan"
                  onChange={handleMaxLoan}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  id="standard-size-small"
                  value={mPaymant ? mPaymant : ""}
                  variant="outlined"
                  label="Down pay"
                  type="number"
                  InputProps={{
                    inputProps: {
                      readOnly: true,
                    },
                  }}
                  placeholder="min down pay"
                  size="small"
                  onChange={handleMinPaymant}
                  helperText="down pay"
                />
              </Box>
              <Box mb={3}>
                <TextField
                  type="number"
                  value={iRate ? iRate : ""}
                  variant="outlined"
                  label="Intrest rate"
                  id="outlined-helperText"
                  InputProps={{
                    inputProps: {
                      readOnly: true,
                    },
                  }}
                  placeholder="intrest rate"
                  helperText="intrest rate"
                  size="small"
                />
              </Box>
              <Box mb={3}>
                <TextField
                  type="number"
                  value={lTerm ? lTerm : ""}
                  variant="outlined"
                  label="Loan term"
                  id="standard-size-small"
                  InputProps={{
                    inputProps: {
                      readOnly: true,
                    },
                  }}
                  placeholder="loan term"
                  helperText="loan term"
                  size="small"
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box className="calc-btn">
        <Button
          disabled={bank === ""}
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<AddIcon />}
          onClick={calculateMortage}
        >
          Calculate
        </Button>
      </Box>
      {isShowMortagePaymant && (
        <Box>
          <Box style={{ color: "green" }} mb={2}>
            Mortage month payment: {mortageMonthPay}
          </Box>
          <MonthPaymantTable
            {...{ mortageMonthPay }}
            {...{ intrestRange }}
            {...{ loanBalanceRange }}
            {...{ equetyRange }}
          />
        </Box>
      )}
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
