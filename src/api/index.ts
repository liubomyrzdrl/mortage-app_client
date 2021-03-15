import axios from 'axios'
import { BankType } from "../types"

type ApiDateFetchType =  Array<BankType> | BankType | boolean

type ApiFetchBanksType = {
  data: Array<BankType>
  [propName: string]:  any
}

export const ApiBank = {    
    fetchBanks(): Promise<ApiFetchBanksType> {
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