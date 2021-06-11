
import {Pool} from 'pg'
import {CRUD, CRUDContract, Employee, EmployeeType, Shop} from '../shared'

const pg = new Pool({
  database: 'pablotest',
  user: 'postgres',
  password: 'postgres',
})

export const database: CRUDContract = {
  shop: buildCRUD<Shop>('shop'),
  employee_type: buildCRUD<EmployeeType>('employee_type'),
  employee: buildCRUD<Employee>('employee')
}

function buildCRUD<T extends {id: number}>(table: string): CRUD<T> {
  return {
    async create(data) {
      const {stmt, values} = insertFactory(table, data)
      console.log('create ', table, stmt, values)
      const {rows} = await pg.query(stmt, values)
      console.log('created ', table, rows)
      return rows[0]
    },
    async update(id, data) {
      const {stmt, values} = updateFactory(table, id, data)
      const {rows} = await pg.query(stmt, values)
      return rows[0]
    },
    async delete(id) {
      await pg.query(`delete from ${table} where id = $1`, [id])
    },
    async getById(id) {
      const {rows} = await pg.query(`select * from ${table} where id = $1`, [id])
      return rows[0]||null
    },
    async getAll() {
      return (await pg.query(`select * from ${table}`)).rows
    }
  }
}

function insertFactory(table: string, data: any) {
  const fields: string[] = []
  const params: string[] = []
  const values: any[] = []
  Object.keys(data).forEach((fieldname, idx) => {
    fields.push(fieldname)
    params.push('$' + (idx + 1))
    values.push(data[fieldname])
  })
  const stmt = `insert into ${table} ( ${fields.join()} ) values ( ${params.join()} ) returning *`
  return {stmt, values}
}

function updateFactory(table: string, id: number, data: any) {
  const fields: string[] = []
  const values: any[] = []
  const fieldnames = Object.keys(data)
  fieldnames.forEach((fieldname, idx) => {
    fields.push(fieldname + ' = $' + (idx + 1))
    values.push(data[fieldname])
  })
  const stmt = `update ${table} set ${fields.join()} where id = $${fieldnames.length + 1} returning *`
  values.push(id)
  return {stmt, values}
}