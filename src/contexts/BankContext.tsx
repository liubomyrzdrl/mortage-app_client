import React, { createContext, useReducer, useEffect }   from 'react'
import { banksReducer } from './reducers/bankReducer'
import { fetchBanks } from '../utils/fetchData'
import { ApiBank } from '../api'

export const BanksContext: any= createContext(null)


const BankContextProvider: React.FC<{}> = ({ children }) => {
    const [banksState, dispatch] = useReducer(banksReducer, [])
 console.log('banksState ++',banksState )
    useEffect(() => {
        // const banks = fetchBanks()
        // console.log("fetchBanks", banks)
       let fetchBanks = async() => {
            try {
                let testfetchBanks = await ApiBank.fetchBanks()
                dispatch({type: 'GET_BANKS', payload: testfetchBanks })
                // return testfetchBanks
            } catch(err) {
                console.log("fetchBanks", err)
            } 
        }
        
        fetchBanks()
       
    },[])

    return <BanksContext.Provider value={banksState}>{ children}</BanksContext.Provider>
}

export default BankContextProvider