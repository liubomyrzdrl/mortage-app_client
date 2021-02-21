import axios from 'axios'
import { BankType } from "../types"


export const ApiBank = {    
    fetchBanks(): Promise<BankType> {
      // return axios.get('/banks')
      return axios.get('/banks')
    },

    createBank( bank: BankType): Promise<BankType> {
      return axios.post('/banks', bank)
    },

    updateBank(id: number, bank: BankType): Promise<BankType> {
        return axios.post(`/banks${id}`, bank)
    },

    deleteBank(id: number): Promise<boolean> {
        return axios.delete(`/banks${id}`)
    }
}