import {get,post,put,deleteFunc} from "./request"

export const readTransactions = () => get('transactions')
export const createTransactions = data => post('transactions',data)
export const readTransaction = id => get(`transactions/${id}`)
export const updateTransaction = id => put(`transactions/${id}`)
export const deleteTransaction = id => deleteFunc(`transactions/${id}`)