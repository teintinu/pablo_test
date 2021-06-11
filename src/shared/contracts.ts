import {Shop} from './models/shop';
import {EmployeeType} from './models/employee_type';
import {Employee} from './models/employee';

export interface CRUDContract {
  shop: CRUD<Shop>
  employee_type: CRUD<EmployeeType>
  employee: CRUD<Employee>
}

export type CRUDTable = keyof CRUDContract

export interface CRUD<T extends {id: number}> {
  create(data: Omit<T, 'id'>): Promise<T>
  update(id: number, data: Partial<Omit<T, 'id'>>): Promise<T>
  delete(id: number): Promise<void>
  getById(id: number): Promise<T | null>
  getAll(): Promise<T[]>
}