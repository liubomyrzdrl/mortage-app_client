import React, { useState } from "react";
import { TableRow, TableCell, TextField, Input } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { BankType } from "../../../types";
import { green, red } from "@material-ui/core/colors";

type AddBankFormType = {
  handleSubmit: (bank: BankType  ) => void;
  setIsAddBank: (isOk: boolean) => void;
};

const AddBank: React.FC<AddBankFormType> = ({ handleSubmit, setIsAddBank }) => {
  const [bankName, setBankName] = useState<string>("");
  const [intrestRate, setIntrestRate] = useState<number>(0);
  const [maxLoan, setMaxLoan] = useState<number>(0);
  const [minPaymant, setMinPaymant] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(0);

  const onSubmit = () => {
    console.log("onSubmit");
    handleSubmit({
      name: bankName,
      intrestRate,
      maxLoan,
      minPaymant,
      loanTerm,
    });
  };
 
  function handleChangeBankName(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("handleChangeBankName", e.target.value);
    setBankName(e.target.value);
  }
  function handleIntrestRate(e: React.ChangeEvent<HTMLInputElement>) {
   // console.log("handleIntrestRate", typeof e.target.value);
 
     
      setIntrestRate(Number(e.target.value));
  
  }
  function handleMaxLoan(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("handleChangeBankName", e.target.value);
    setMaxLoan(Number(e.target.value));
  }
  function handleMinPaymant(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("handleChangeBankName", e.target.value);
    setMinPaymant(Number(e.target.value));
  }
  function handleLoanTerm(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("handleChangeBankName", e.target.value);
    setLoanTerm(Number(e.target.value));
  }
  return (
    <TableRow>
      <TableCell component="th" scope="row" align="center">
        <TextField
          placeholder="bank name"
          multiline
          rowsMax={4}
          value={bankName}
          inputProps={{ 'style' : {textAlign: 'center'}}}
          onChange={handleChangeBankName}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          id="standard-size-small"
          type="number"
          inputProps={{ 'style': {textAlign: 'center'}}}
          placeholder="min down pay"          
          size="small" 
          onChange={handleMinPaymant}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          id="standard-size-small"
          type="number"
          inputProps={{ 'style' : {textAlign: 'center'}}}
          placeholder="max loan"
          size="small" 
          rowsMax={4}     
          onChange={handleMaxLoan}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          type="number" 
          id="standard-size-small"
          inputProps={{ 'style' : {textAlign: 'center'}}}
          placeholder="loan term"
          size="small" 
          onChange={handleLoanTerm}
        />
      </TableCell>
      <TableCell align="center">
          <TextField  
              type="number" 
              id="standard-size-small" 
              defaultValue="Small" 
              inputProps={{ 'style' : {textAlign: 'center'}}}
              placeholder="intrest rate"
              size="small" 
              onChange={handleIntrestRate}
          />
      </TableCell>
      <TableCell align="center" onClick={() => onSubmit()}>
        <AddCircleIcon style={{ color: green[500], cursor: "pointer" }} />
      </TableCell>
      <TableCell align="center">
        <CancelIcon
          style={{ color: red[500], cursor: "pointer" }}
          onClick={() => setIsAddBank(false)}
        />
      </TableCell>
    </TableRow>
  );
};

export default AddBank;
