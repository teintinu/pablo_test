import {expect} from "chai";
import {Employee, EmployeeType, Shop} from "./shared";
import {clientAPI} from "./shared/apiClient";

const testData = initializeTestData()

describe('Test all APIs', () => {

  let insertedShop: Shop
  let insertedEmployee_type: EmployeeType
  let insertedEmployee: Employee

  describe('Shop', () => {

    let expectedCreated: Shop
    let expectedUpdated: Shop

    it('create', async () => {
      insertedShop = await clientAPI.shop.create(testData.shop);
      expectedCreated = {
        id: insertedShop.id,
        ...testData.shop
      }
      expect(insertedShop).deep.eq(expectedCreated)
    })

    it('GetById', async () => {
      const shopGettedById = await clientAPI.shop.getById(insertedShop.id)
      expect(shopGettedById).deep.eq(expectedCreated)
    })

    it('GetAll', async () => {
      const shopGetAll = await clientAPI.shop.getAll()
      expect(shopGetAll.filter((s) => s.id === expectedCreated.id)[0]).deep.eq(expectedCreated)
    })

    it('Update', async () => {
      expectedUpdated = {
        id: insertedShop.id,
        ...testData.shop,
        name: 'updated:' + insertedShop.id
      }
      const shopUpdated = await clientAPI.shop.update(expectedUpdated.id, {
        name: expectedUpdated.name
      })
      expect(shopUpdated).deep.eq(expectedUpdated)
    })

  })

  describe('Employee type', () => {

    let expectedCreated: EmployeeType
    let expectedUpdated: EmployeeType

    it('create', async () => {
      insertedEmployee_type = await clientAPI.employee_type.create(testData.employee_type);
      expectedCreated = {
        id: insertedEmployee_type.id,
        ...testData.employee_type
      }
      expect(insertedEmployee_type).deep.eq(expectedCreated)
    })

    it('GetById', async () => {
      const gettedById = await clientAPI.employee_type.getById(insertedEmployee_type.id)
      expect(gettedById).deep.eq(expectedCreated)
    })

    it('GetAll', async () => {
      const getAll = await clientAPI.employee_type.getAll()
      expect(getAll.filter((s) => s.id === expectedCreated.id)[0]).deep.eq(expectedCreated)
    })

    it('Update', async () => {
      expectedUpdated = {
        id: insertedEmployee_type.id,
        ...testData.employee_type,
        name: 'updated:' + insertedEmployee_type.id
      }
      const updated = await clientAPI.employee_type.update(expectedUpdated.id, {
        name: expectedUpdated.name
      })
      expect(updated).deep.eq(expectedUpdated)
    })

  })

  describe('Employee', () => {

    let expectedCreated: Employee
    let expectedUpdated: Employee

    it('create', async () => {
      testData.employee.employee_type_id = insertedEmployee_type.id
      testData.employee.shop_id = insertedShop.id
      insertedEmployee = await clientAPI.employee.create(testData.employee);
      expectedCreated = {
        id: insertedEmployee.id,
        ...testData.employee
      }
      expect(insertedEmployee).deep.eq(expectedCreated)
    })

    it('GetById', async () => {
      const gettedById = await clientAPI.employee.getById(insertedEmployee.id)
      expect(gettedById).deep.eq(expectedCreated)
    })

    it('GetAll', async () => {
      const getAll = await clientAPI.employee.getAll()
      expect(getAll.filter((s) => s.id === expectedCreated.id)[0]).deep.eq(expectedCreated)
    })

    it('Update', async () => {
      expectedUpdated = {
        id: insertedEmployee.id,
        ...testData.employee,
        name: 'updated:' + insertedEmployee.id
      }
      const updated = await clientAPI.employee.update(expectedUpdated.id, {
        name: expectedUpdated.name
      })
      expect(updated).deep.eq(expectedUpdated)
    })

  })

  describe('Deletion', () => {
    it('Employee', async () => {
      await clientAPI.employee.delete(insertedEmployee.id)
      const assertDeletion = await clientAPI.employee.getById(insertedEmployee.id)
      expect(assertDeletion).deep.eq(null)
    })
    it('shop', async () => {
      await clientAPI.shop.delete(insertedShop.id)
      const assertDeletion = await clientAPI.shop.getById(insertedShop.id)
      expect(assertDeletion).deep.eq(null)
    })
    it('Employee type', async () => {
      await clientAPI.employee_type.delete(insertedEmployee_type.id)
      const assertDeletion = await clientAPI.employee_type.getById(insertedEmployee_type.id)
      expect(assertDeletion).deep.eq(null)
    })
  })

})

function initializeTestData() {
  return {
    shop: {
      name: 'shop test',
      address: '1# street',
      telephone: '555'
    },
    employee_type: {
      name: 'Manager',
      salary: 10000
    },
    employee: {
      name: 'Peter Tester',
      address: '1# street',
      telephone: '555',
      shop_id: 0,
      employee_type_id: 0,
      employment_date: new Date(2021, 6, 11, 0, 0, 0, 0)
    }
  }
}