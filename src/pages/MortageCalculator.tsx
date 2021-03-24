import React, { useState, useEffect } from "react";
import { Box, TextField, makeStyles, Button, Icon } from "@material-ui/core";
import Layout from "../components/Layout";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { BankType, RootStore } from "../types";
import { getBanks } from "../modules/banks/bankOperation";
import AddIcon from '@material-ui/icons/Add';
import MonthPaymantTable from "../components/MonthPaymantTable";

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
  const [iRate, setIntrestRate] = useState<number>();
  const [lTerm, setLoanTerm] = useState<number>();
  const [mortageMonthPay, setMortageMonthPay] = useState(0)
  const [intrestRange, setIntrestRange] = useState([])
  const [equetyRange, setEquetyRange] = useState([])
  const [loanBalanceRange, setLoanBalanceRange] = useState([])

  let intrestRateNumber = iRate / 100
  let nPer = lTerm * 12;
  let intrestMonthly = intrestRateNumber / 12;  
  let MAX = mLoan + mPaymant
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

  function calculateMortage() {
    
    
    let intrestMonthlyPlus = (1 + intrestMonthly);
    let powIntrestMonth = Math.pow(intrestMonthlyPlus, nPer);
    let numerator = mLoan *   intrestMonthly * powIntrestMonth;
  
    let denominator = Math.pow(1 + intrestMonthly, nPer) - 1;

    let payment =  numerator / denominator;
    setMortageMonthPay(Number(payment.toFixed(2)));
    calcTable(payment.toFixed(2))
    
  }
  function calcTable(mortagePayment) {
     let loanBalance =  mLoan;
     
      let arr = [] 
      let equty = []
      let loan = []
      while(loanBalance > 0 ) {
      let res = loanBalance * intrestMonthly;
      //debugger
      // setIntrestRange(() => intrestRange.concat(res));
      console.log('res', loanBalance)
      arr.push(res)
      equty.push(MAX - loanBalance)
 
       loanBalance = loanBalance - Number(mortagePayment) + res;
       if(loanBalance > 0) {
          loan.push(loanBalance)
       } 
       console.log('loanBalance', loanBalance)
      }
       setIntrestRange(arr)
       setLoanBalanceRange(loan)
       setEquetyRange(equty.slice(1, equty.length))
       console.log('intrestRange', equty);
     
  }

  function handleChange(e) {    
    setBank(e.target.value);
    const filteredBank = banks.find(b => b.name === e.target.value)
    console.log("Event Bank",filteredBank);
    setMLoan(filteredBank.maxLoan)
    setMPaymant(filteredBank.minPaymant)
    setIntrestRate(filteredBank.intrestRate)
    setLoanTerm(filteredBank.loanTerm)
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
           <TextField
              type="number"
              value={iRate ? iRate : "" }
              error={iRate === 0}
              helperText={ iRate === 0 && "Empty input is not allowed"}
              id="standard-size-small"
              InputProps={{
                inputProps: { 
                     min: 0,
                     style: {
                       textAlign: "center"
                     } 
                }
              }}
              placeholder="intrest rate"
              size="small"
        
            />
             <TextField
              type="number"
              value={lTerm ? lTerm : ""}
              error={lTerm === 0}
              helperText={ lTerm === 0 && "Empty input is not allowed"}
              id="standard-size-small"
              InputProps={{
                inputProps: { 
                     min: 0,
                     style: {
                       textAlign: "center"
                     } 
                }
              }}
              placeholder="loan term"
              size="small"
         
            />
      </Box>
      <Box>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddIcon />}
        onClick={calculateMortage}
      >
       Calculate
      </Button>
        <Box>Mortage month payment: {mortageMonthPay}</Box>
      </Box>
      <MonthPaymantTable 
        {...{ mortageMonthPay }}
        {...{ intrestRange }}
        {...{ loanBalanceRange }}
        {...{ equetyRange }}
      />
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
