import axios from 'axios'
import { BankType } from "../types"

 

type ApiFetchBanksType = {
  data: Array<BankType>
  [propName: string]:  any
}
type ApiFetchBankType = {
  data:  BankType
  [propName: string]:  any
}

export const ApiBank = {    
    fetchBanks(): Promise<ApiFetchBanksType> {
      return axios.get('/banks')
    },

    createBank( bank: BankType): Promise<ApiFetchBankType> {
      return axios.post('/banks', bank)
    },

    updateBank(id: string, bank: BankType): Promise<ApiFetchBankType> {
        return axios.put(`/bank/${id}`, bank)
    },

    deleteBank(id: string): Promise<boolean> {
        return axios.delete(`/bank/${id}`)
    }
}