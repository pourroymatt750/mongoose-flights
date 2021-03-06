import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

/* GET users listing. */
router.get('/', flightsCtrl.index)

//GET /flights/new
router.get('/new', flightsCtrl.new)

//GET info on single flight
router.get('/:id', flightsCtrl.show)

//Edit view
router.get('/:id/edit', flightsCtrl.edit)

//POST /flights
router.post('/', flightsCtrl.create)

//POST new ticket 
router.post('/:id/tickets', flightsCtrl.createTicket)

//POST request to add meal
router.post('/:id/meals', flightsCtrl.addMeal)

//DELETE a flight
router.delete('/:id', flightsCtrl.delete)

//Update a flight
router.put('/:id', flightsCtrl.update)

export {
  router
}
