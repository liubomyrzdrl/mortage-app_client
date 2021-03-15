import React, { useState } from "react";
import { TableRow, TableCell, TextField } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import { BankType } from "../../types";
import AddCircleIcon from "@material-ui/icons/AddCircle";

type TableItemType = BankType & {
  handleUpdate: (bank: BankType) => void;
  handleDelete: (_id: string) => void;
};

const TableItem: React.FC<TableItemType> = ({
  _id,
  name,
  minPaymant,
  maxLoan,
  loanTerm,
  intrestRate,
  handleUpdate,
  handleDelete,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [bName, setBankName] = useState<string>(name);
  const [iRate, setIntrestRate] = useState<number>(intrestRate);
  const [mLoan, setMaxLoan] = useState<number>(maxLoan);
  const [mPaymant, setMinPaymant] = useState<number>(minPaymant);
  const [lTerm, setLoanTerm] = useState<number>(loanTerm);
  console.log("_Id", _id);

  function hUpdate() {
    let updatedBank: BankType = {
      _id,
      name: bName,
      intrestRate: iRate,
      maxLoan: mLoan,
      minPaymant: mPaymant,
      loanTerm: lTerm,
    };
    handleUpdate(updatedBank);
  }

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
    <TableRow key={name}>
      {!isUpdate ? (
        <>
          <TableCell component="th" scope="row" align="center">
            {name}
          </TableCell>
          <TableCell align="center">{minPaymant}</TableCell>
          <TableCell align="center">{maxLoan}</TableCell>
          <TableCell align="center">{loanTerm}</TableCell>
          <TableCell align="center">{intrestRate}</TableCell>
        </>
      ) : (
        <>
          <TableCell component="th" scope="row" align="center">
            <TextField
              placeholder="bank name"
              multiline
              rowsMax={4}
              value={name}
              inputProps={{ style: { textAlign: "center" } }}
              onChange={handleChangeBankName}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="standard-size-small"
              type="number"
              inputProps={{ style: { textAlign: "center" } }}
              placeholder="min down pay"
              size="small"
              value={minPaymant}
              onChange={handleMinPaymant}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="standard-size-small"
              value={maxLoan}
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
              value={loanTerm}
              id="standard-size-small"
              inputProps={{ style: { textAlign: "center" } }}
              placeholder="loan term"
              size="small"
              onChange={handleLoanTerm}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              type="number"
              value={intrestRate}
              id="standard-size-small"
              defaultValue="Small"
              inputProps={{ style: { textAlign: "center" } }}
              placeholder="intrest rate"
              size="small"
              onChange={handleIntrestRate}
            />
          </TableCell>
        </>
      )}
      <TableCell align="center">
        {isUpdate ? (
          <AddCircleIcon
            style={{ color: green[500], cursor: "pointer" }}
            onClick={() => hUpdate()}
          />
        ) : (
          <UpdateIcon
            style={{ color: blue[500], cursor: "pointer" }}
            onClick={() => setIsUpdate(!isUpdate)}
          />
        )}
      </TableCell>
      <TableCell align="center">
        {isUpdate ? (
          <CancelIcon
            style={{ color: red[500], cursor: "pointer" }}
            onClick={() => setIsUpdate(!isUpdate)}
          />
        ) : (
          <DeleteIcon
            style={{ color: red[500], cursor: "pointer" }}
            onClick={() => handleDelete(String(_id))}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
