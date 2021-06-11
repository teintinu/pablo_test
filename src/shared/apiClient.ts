

// creates typed client to the API, can be used in a frontend

import axios, {AxiosResponse} from 'axios';
import {CRUDContract, CRUDTable} from '../shared';
import {CRUD} from './contracts';
import {Shop} from './models/shop';
import {EmployeeType} from './models/employee_type';
import {Employee} from './models/employee';

const ns = 'http://localhost:3000'

export const clientAPI: CRUDContract = {
  shop: buildCRUD<Shop>('shop'),
  employee_type: buildCRUD<EmployeeType>('employee_type'),
  employee: buildCRUD<Employee>('employee'),
}

function buildCRUD<T extends {id: number}>(table: CRUDTable): CRUD<T> {
  return {
    create(data: any) {
      return axios.post(ns + '/' + table, data)
        .then(handleError<T>())
    },
    update(id: number, data: any) {
      return axios.post(ns + '/' + table + '/' + id, data)
        .then(handleError<T>())
    },
    delete(id: number) {
      return axios.delete(ns + '/' + table + '/' + id)
        .then(handleError<void>())
    },
    getById(id: number) {
      return axios.get(ns + '/' + table + '/' + id)
        .then(handleError<T>())
    },
    getAll() {
      return axios.get(ns + '/' + table)
        .then(handleError<T[]>())
    },
  }
  function handleError<T>() {
    return (res: AxiosResponse<any>) => {
      if (res.status !== 200)
        throw new Error([res.statusText, ' status=', res.status].join(''))
      return deserializeDate(res.data) as T
    }
  }
}

function deserializeDate(data: any): any {
  if (!data) return null
  if (Array.isArray(data)) return data.map(deserializeDate)
  const ret: any = {}
  Object.keys(data).forEach((fieldname) => {
    debugger
    const fieldvalue = data[fieldname]
    if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.test(fieldvalue))
      ret[fieldname] = new Date(fieldvalue)
    else
      ret[fieldname] = fieldvalue
  })
  return ret
}