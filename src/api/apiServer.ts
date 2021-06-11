
// declare endpoits for express appliation automaticlly based on crud contracts

import {Express} from "express";
import {CRUDTable} from '../shared';
import {database} from "./db";

export function declareEndpoints(app: Express) {
  declareEndpointsForTable(app, 'shop')
  declareEndpointsForTable(app, 'employee_type')
  declareEndpointsForTable(app, 'employee')
}

function declareEndpointsForTable(app: Express, table: CRUDTable) {
  // declare create endpoint for table
  app.post('/' + table, async (req, res) => {
    try {
      const r = await database[table].create(req.body)
      res.send(r)
      res.status(200)
    } catch (e) {
      res.status(501).send(e.toString())
    }
    res.end()
  })
  // declare update endpoint for table
  app.post('/' + table + '/:id', async (req, res) => {
    try {
      const r = await database[table].update(parseInt(req.params.id, 10), req.body)
      res.send(r)
      res.status(200)
    } catch (e) {
      res.status(501).send(e.toString())
    }
    res.end()
  })
  // declare delete endpoint for table
  app.delete('/' + table + '/:id', async (req, res) => {
    try {
      await database[table].delete(parseInt(req.params.id, 10))
      res.send('')
      res.status(200)
    } catch (e) {
      res.status(501).send(e.toString())
    }
    res.end()
  })
  // declare getbyid endpoint for table
  app.get('/' + table + '/:id', async (req, res) => {
    try {
      const r = await database[table].getById(parseInt(req.params.id, 10))
      res.send(r)
      res.status(200)
    } catch (e) {
      res.status(501).send(e.toString())
    }
    res.end()
  })
  // declare getall endpoint for table
  app.get('/' + table, async (_req, res) => {
    try {
      const r = await database[table].getAll()
      res.send(r)
      res.status(200)
    } catch (e) {
      res.status(501).send(e.toString())
    }
    res.end()
  })
}
