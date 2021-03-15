import { ApiBank } from '../api'

export const fetchBanks = async() => {
    try {
        let testfetchBanks = await ApiBank.fetchBanks()        
        return testfetchBanks
    } catch(err) {
        console.log("fetchBanks", err)
    } 
}