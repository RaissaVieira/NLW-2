import express, { response } from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = express.Router()

const classesController = new ClassesController
const connectionsController = new ConnectionsController

routes.post('/classes', classesController.Create)
routes.get('/classes', classesController.Index)

routes.post('/connections', connectionsController.Create)
routes.get('/connections', connectionsController.Index)

export default routes
