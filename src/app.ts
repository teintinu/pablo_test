// create express application

import express from "express";
import {declareEndpoints} from "./api/apiServer";

export const app = express();
app.use(express.json());
app.set('json replacer', function (this: any, key: any, value: any) {
  const v = this[key]
  if (v instanceof Date) {
    value = v.toISOString()
  }
  return value;
});

declareEndpoints(app)
