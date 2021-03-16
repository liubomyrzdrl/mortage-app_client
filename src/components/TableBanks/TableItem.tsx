import React, { useState } from "react";
import { TableRow, TableCell, TextField, makeStyles } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import { BankType } from "../../types";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  
 
  iconProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

type TableItemType = BankType & {
  handleUpdate: (bank: BankType) => boolean;
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
  const [loading, setIsLoading] = useState(false);

  const [bName, setBankName] = useState<string>(name);
  const [iRate, setIntrestRate] = useState<number>(intrestRate);
  const [mLoan, setMaxLoan] = useState<number>(maxLoan);
  const [mPaymant, setMinPaymant] = useState<number>(minPaymant);
  const [lTerm, setLoanTerm] = useState<number>(loanTerm);
  console.log("_Id", _id);

  const classes = useStyles();

  function hUpdate() {
    let updatedBank: BankType = {
      _id,
      name: bName,
      intrestRate: iRate,
      maxLoan: mLoan,
      minPaymant: mPaymant,
      loanTerm: lTerm,
    };
    setIsLoading(true)
    const res = handleUpdate(updatedBank);
    if(res) {
      setIsLoading(false)
      setIsUpdate(!isUpdate)
    }
  }

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
              value={bName}
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
              value={mPaymant}
              onChange={handleMinPaymant}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="standard-size-small"
              value={mLoan}
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
              value={lTerm}
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
              value={iRate}
              id="standard-size-small"
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
          <>
          <AddCircleIcon
            className="addCircleIcon"
            style={{ color: green[500], cursor: "pointer" }}
            onClick={() => hUpdate()}
          />
          {loading && <CircularProgress size={24} className={classes.iconProgress} />}
          </>
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
