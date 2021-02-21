import React, { useContext, useEffect, useReducer } from 'react'
import { Box, Button } from '@material-ui/core'
import { BanksContext } from '../contexts/BankContext'
import { BankType } from "../types"
import { banksReducer } from '../contexts/reducers/bankReducer'

const BanksList: React.FC = () => {
    const banksState: Array<BankType> = useContext(BanksContext)
    const [_, dispatch] = useReducer(banksReducer, [])

 
    console.log("banksState", banksState)

    if(!banksState) {
        return <div>Loading ...</div>
    }
    // const handleClick = () => {
    //     dispatch({type:"ADD_BANK", payload: {
    //         "_id": "ttttesssstt",
    //         "name": "TEST",
    //         "intrestRate": 7,
    //         "maxLoan": 280000,
    //         "minPaymant": 40000,
    //         "loanTerm": 72,
    //     }})
    // }
    const banks = banksState.map(item => <h2 key={item._id}>{item._id}</h2>)
    return (
        <Box>BanksList
            {banks}
            <Button>Experement</Button>
       </Box>
    )
} 
export default BanksList