import {get,post,put,patch,deleteFunc} from "./request"

export const readInstruments = () => get('instruments')
export const createInstruments = data => post('instruments',data)
export const readInstrument = id => get(`instruments/${id}`)
export const updateInstrument = id => put(`instruments/${id}`)
export const deleteInstrument = id => deleteFunc(`instruments/${id}`)
export const patchInstrument = id => patch(`instruments/${id}/amount`)