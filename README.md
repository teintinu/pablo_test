# Pablo test app

### to run this code

1. clone this repository
2. create database name `pablotest` and run [this DML script](https://github.com/teintinu/pablo_test/blob/main/scripts/dml.sql)
3. `npm install`
4. `npm start`
5. `npm test` (in another terminal session)
 
### files
|name|description|
|-|-|
|server.ts|main file|
|app.ts|Express application|
|api/db.ts|API Database operations|
|api/apiServer.ts|API endpoints routes|
|shared/*|Shared files who can be used on backend and frontend|
|shared/apiClient|Typed client for API|
|shared/model/*|data models|
|api.test.ts|API testing|

### comments

- This sample uses esbuild
- I prefered automatic test insted Postman test 
- I used mocha insted jest because esbuild for jest was [failing](https://github.com/folke/esbuild-runner/issues/26)
