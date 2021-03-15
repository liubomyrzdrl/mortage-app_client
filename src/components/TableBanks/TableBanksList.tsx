import React, { useState } from 'react'
import "../../scss/style.scss"
import { RootStore, BankType } from '../../types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { createData } from '../../utils/createData';
import { TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel, Box } from '@material-ui/core';
import TableItem from './TableItem'
import AddBoxIcon from '@material-ui/icons/AddBox';

import AddBank from './components/AddBank';

import green from '@material-ui/core/colors/green';



type TableBanksProps = {
    isLoading: boolean,
    banks: Array<BankType>
}
const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Bank Name' },
    { id: 'minimumDownPay', numeric: true, disablePadding: false, label: 'Minimum Down pay' },
    { id: 'maximumLoan', numeric: true, disablePadding: false, label: 'Maximum Loan' },
    { id: 'loanTerm', numeric: true, disablePadding: false, label: 'Loan Term' },
    { id: 'intrestRate', numeric: true, disablePadding: false, label: 'Intrest Rate' },
    { id: 'Update', numeric: false, disablePadding: false, label: 'Update' },
    { id: 'Delete', numeric: false, disablePadding: false, label: 'Delete' },
  ];

 

const TableBanksList: React.FC<TableBanksProps> = ({ isLoading, banks }) => {
    const [isAddBank, setIsAddBank] = useState<boolean>(false);
    let useStyles; 
    if(!isLoading ) {
      useStyles = makeStyles({
         table: {
 
          minWidth: banks.length - 1,
         },
       });

    }
      
    const classes = useStyles();
    const rows = banks.map(b => createData(String(b._id), b.name, b.minPaymant, b.maxLoan, b.loanTerm, b.intrestRate));
    
    function handleSubmit(bank: BankType) {
      console.log('handleSubmit', bank)
    }

    function handleUpdate(bank: any) {
      console.log("handleUpdate", bank)
    }
    function handleDelete(_id: any) {
      console.log("handleDelete", _id)
    }

    if (isLoading) {
        return <div>Loading ...</div>;
      }
    return (
        <Box className="container" display="flex" flexDirection="column">          
           {
            !isAddBank && 
            <AddBoxIcon 
              style={{ color: green[500], cursor: "pointer", alignSelf: "flex-end" }} 
              fontSize="large"
              onClick={() => setIsAddBank(!isAddBank)}
            />}
           

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headCells.map(c => 
                                    <TableCell 
                                      key={c.id}
                                      align="center"
                                      padding={c.disablePadding ? 'none' : 'default'}
                                    >
                                          <TableSortLabel>{c.label}</TableSortLabel> 
                                    </TableCell>)}
                            </TableRow>
                        </TableHead>
                    <TableBody>
          
                        {isAddBank &&  <AddBank {...{handleSubmit}} {...{setIsAddBank}} /> }      
                      
                        {rows.map((row) => (
                          <TableItem  key={row._id} {...row} {...{handleUpdate}} {...{handleDelete}} /> 
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
        </Box>
    )
}

// const mapStateToProps = (state: RootStore) => {
//     return {
//       banks: state.banksReducer.items,
//       isLoading: state.banksReducer.isLoading,
//     };
//   };
  
export default TableBanksList; 
// export default connect(mapStateToProps)(TableBanks); 