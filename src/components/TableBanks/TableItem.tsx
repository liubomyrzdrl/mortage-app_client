import React, { useState } from "react";
import { TableRow, TableCell, TextField, Button } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import { BankType } from "../../types";
import AddCircleIcon from "@material-ui/icons/AddCircle";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   wrapper: {
//     margin: theme.spacing(1),
//     position: 'relative',
//   },
  
 
//   iconProgress: {
//     color: green[500],
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     marginTop: -12,
//     marginLeft: -12,
//   },
// }));

type TableItemType = BankType & {
  handleUpdate: (bank: BankType) => Promise<boolean> ;
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
  // const [canselTriger, setCancelTriger] = useState(false);

  const [bName, setBankName] = useState<string>(name);
  const [iRate, setIntrestRate] = useState<number>(intrestRate);
  const [mLoan, setMaxLoan] = useState<number>(maxLoan);
  const [mPaymant, setMinPaymant] = useState<number>(minPaymant);
  const [lTerm, setLoanTerm] = useState<number>(loanTerm);
 

  let validateOkButtonEmpty =  bName === "" || iRate === 0 || mLoan === 0 || mPaymant === 0 || lTerm === 0
  // console.log("validateOkButtonEmpty", validateOkButtonEmpty ) 
  // console.log("Props", bName, iRate, mLoan, mPaymant, lTerm )

  async function hUpdate() {
    let updatedBank: BankType = {
      _id,
      name: bName,
      intrestRate: iRate,
      maxLoan: mLoan,
      minPaymant: mPaymant,
      loanTerm: lTerm,
    };
    setIsLoading(true)
    const res = await  handleUpdate(updatedBank);
    if(res) {
      setIsLoading(false)
      setIsUpdate(!isUpdate)
    }
  }
  function handleCancel() {
    if(bName !== name) {
        setBankName(name)
    }
    
    if(iRate !== intrestRate) {
        setIntrestRate(intrestRate)
    }

    if(mLoan !== maxLoan) {
        setMaxLoan(maxLoan)
    }

    if(mPaymant !== minPaymant) {
        setMinPaymant(minPaymant)
    }

    if(lTerm !== loanTerm) {
        setLoanTerm(loanTerm)
    }
      setIsUpdate(!isUpdate)
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
              error={bName === undefined}
              helperText={ bName === "" && "Empty input is not allowed"}
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
              value={mPaymant ? mPaymant : ""}
              error={mPaymant === 0}
              helperText={ mPaymant === 0 && "Empty input is not allowed"}
              type="number"
              InputProps={{
                inputProps: { 
                     min: 0,
                     style: {
                       textAlign: "center"
                     } 
                }
              }}
              placeholder="min down pay"
              size="small"
              onChange={handleMinPaymant}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="standard-size-small"
              value={mLoan ? mLoan : ""}
              error={mLoan === 0}
              helperText={ mLoan === 0 && "Empty input is not allowed"}
              type="number"
              InputProps={{
                inputProps: { 
                     min: 0,
                     style: {
                       textAlign: "center"
                     } 
                }
              }}
              placeholder="max loan"
              size="small"
              rowsMax={4}
              onChange={handleMaxLoan}
            />
          </TableCell>
          <TableCell align="center">
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
              onChange={handleLoanTerm}
            />
          </TableCell>
          <TableCell align="center">
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
              onChange={handleIntrestRate}
            />
          </TableCell>
        </>
      )}
      <TableCell align="center">
        {isUpdate ? (
          <>
          <Button 
           // disabled ={validateOkButtonEmpty}
            onClick={() => hUpdate()}
          >
            <AddCircleIcon
              className="addCircleIcon"
              style={ validateOkButtonEmpty ? { color: grey[500]} : { color: green[500], cursor: "pointer" } }
            />
          </Button>
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
            onClick={() => handleCancel()}
          />
        ) : (
          <DeleteIcon
            style={{ color: red[500], cursor: "pointer" }}
            onClick={() => handleDelete(_id)}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
