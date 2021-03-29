import React, { useState } from "react";
import "../../scss/style.scss";
import { BankType } from "../../types";
import { makeStyles } from "@material-ui/core/styles";
import { createData } from "../../utils/createData";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  Box,
} from "@material-ui/core";
import TableItem from "./TableItem";
import AddBoxIcon from "@material-ui/icons/AddBox";

import AddBank from "./components/AddBank";

import green from "@material-ui/core/colors/green";

type TableBanksProps = {
  isLoading: boolean
  banks: Array<BankType>
  createBank: (bank: BankType) => Promise<boolean>
  updateBank: (bank: BankType) => Promise<boolean>
  deleteBank: (_id: string) => Promise<boolean>
};
const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Bank Name" },
  {
    id: "minimumDownPay",
    numeric: true,
    disablePadding: false,
    label: "Minimum Down pay",
  },
  {
    id: "maximumLoan",
    numeric: true,
    disablePadding: false,
    label: "Maximum Loan",
  },
  { id: "loanTerm", numeric: true, disablePadding: false, label: "Loan Term" },
  {
    id: "intrestRate",
    numeric: true,
    disablePadding: false,
    label: "Intrest Rate",
  },
  { id: "Update", numeric: false, disablePadding: false, label: "Update" },
  { id: "Delete", numeric: false, disablePadding: false, label: "Delete" },
];

const TableBanksList: React.FC<TableBanksProps> = ({
  isLoading,
  banks,
  createBank,
  updateBank,
  deleteBank,
}) => {
  const [isAddBank, setIsAddBank] = useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let useStyles;
  if (!isLoading) {
    useStyles = makeStyles({
      table: {
        minWidth: banks.length - 1,
      },
    });
  }

  const classes = useStyles();
  const rows = banks.map((b) =>
    createData(
      String(b._id),
      b.name,
      b.minPaymant,
      b.maxLoan,
      b.loanTerm,
      b.intrestRate
    )
  );
  
  async function handleSubmit(bank: BankType) {
    try {
      await createBank(bank);
      setIsAddBank(!isAddBank);
    } catch (error) {
      console.log("error create bank", error);
    }
  }

  async function handleUpdate(bank: BankType): Promise<boolean> {
    try {
      const res = await updateBank(bank)
       return res;
    } catch (error) {
      console.log("error create bank", error);
    }
  }

  async function handleDelete(_id: string) {
    try {
      await deleteBank(_id);
    } catch (error) {
      console.log("Delete Bank Error", error);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <Box  display="flex" flexDirection="column">
      {!isAddBank && (
        <AddBoxIcon
          style={{
            color: green[500],
            cursor: "pointer",
            alignSelf: "flex-end",
          }}
          fontSize="large"
          onClick={() => setIsAddBank(!isAddBank)}
        />
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((c) => (
                <TableCell
                  key={c.id}
                  align="center"
                  padding={c.disablePadding ? "none" : "default"}
                >
                  <TableSortLabel>{c.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isAddBank && (
              <AddBank {...{ handleSubmit }} {...{ setIsAddBank }} />
            )}

            {rows.map((row) => (
              <TableItem
                key={row._id}
                {...row}
                {...{ handleUpdate }}
                {...{ handleDelete }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Box>
  );
};

export default TableBanksList;
