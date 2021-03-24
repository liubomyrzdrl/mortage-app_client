import React, { useState } from "react";
import { TableRow, TableCell, TextField, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { BankType } from "../../../types";
import { green, red, grey } from "@material-ui/core/colors";
import {
  valOkButtonEmpty,
  valOkButtonUndefined,
} from "../../../utils/validationField";

type AddBankFormType = {
  handleSubmit: (bank: BankType) => void;
  setIsAddBank: (isOk: boolean) => void;
};

const AddBank: React.FC<AddBankFormType> = ({ handleSubmit, setIsAddBank }) => {
  const [bankName, setBankName] = useState<string>();
  const [intrestRate, setIntrestRate] = useState<number>();
  const [maxLoan, setMaxLoan] = useState<number>();
  const [minPaymant, setMinPaymant] = useState<number>();
  const [loanTerm, setLoanTerm] = useState<number>();

  // let validateOkButtonEmpty = valOkButtonEmpty(
  //   bankName,
  //   intrestRate,
  //   maxLoan,
  //   minPaymant,
  //   loanTerm
  // );
  // let validateOkButtonUndefined = valOkButtonUndefined(
  //   bankName,
  //   intrestRate,
  //   maxLoan,
  //   minPaymant,
  //   loanTerm
  // );
  let validateOkButtonEmpty = bankName === "" || intrestRate === 0 || maxLoan === 0 || minPaymant === 0 || loanTerm === 0;
  let validateOkButtonUndefined =   bankName === undefined || maxLoan === undefined || intrestRate === undefined || minPaymant === undefined ||loanTerm === undefined
   
    console.log('validateOkButtonEmpty', validateOkButtonEmpty)
    console.log('validateOkButtonUndefined', validateOkButtonUndefined)
  const onSubmit = () => {
    handleSubmit({
      name: bankName,
      intrestRate,
      maxLoan,
      minPaymant,
      loanTerm,
    });
  };

  function handleChangeBankName(e: React.ChangeEvent<HTMLInputElement>) {
    setBankName(e.target.value);
  }
  function handleIntrestRate(e: React.ChangeEvent<HTMLInputElement>) {
    setIntrestRate(Number(e.target.value));
  }
  function handleMaxLoan(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxLoan(Number(e.target.value));
  }
  function handleMinPaymant(e: React.ChangeEvent<HTMLInputElement>) {
    setMinPaymant(Number(e.target.value));
  }
  function handleLoanTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setLoanTerm(Number(e.target.value));
  }
  return (
    <TableRow>
      <TableCell component="th" scope="row" align="center">
        <TextField
          error={bankName === ""}
          placeholder="bank name"
          multiline
          helperText={bankName === "" && "Empty input is not allowed"}
          rowsMax={4}
          value={bankName}
          inputProps={{ style: { textAlign: "center" } }}
          onChange={handleChangeBankName}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          error={minPaymant === 0}
          id="standard-size-small"
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
          helperText={minPaymant === 0 && "Empty input is not allowed"}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          id="standard-size-small"
          error={maxLoan === 0}
          type="number"
          inputProps={{ style: { textAlign: "center" } }}
          placeholder="max loan"
          size="small"
          rowsMax={4}
          onChange={handleMaxLoan}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
              style: {
                textAlign: "center",
              },
            },
          }}
          error={loanTerm === 0}
          id="standard-size-small"
          placeholder="loan term"
          size="small"
          helperText={loanTerm === 0 && "Empty input is not allowed"}
          onChange={handleLoanTerm}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          type="number"
          error={intrestRate === 0}
          id="standard-size-small"
          defaultValue="Small"
          helperText={intrestRate === 0 && "Empty input is not allowed"}
          InputProps={{
            inputProps: {
              min: 0,
              style: {
                textAlign: "center",
              },
            },
          }}
          placeholder="intrest rate"
          size="small"
          onChange={handleIntrestRate}
        />
      </TableCell>
      <TableCell align="center">
        <Button
          disabled={validateOkButtonEmpty }
          onClick={() => onSubmit()}
        >
          <AddCircleIcon
            style={
              validateOkButtonEmpty || validateOkButtonUndefined
                ? { color: grey[500] }
                : { color: green[500], cursor: "pointer" }
            }
          />
        </Button>
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
