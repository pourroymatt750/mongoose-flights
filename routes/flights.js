import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource')
})

//GET /flights/new
router.get('/new', flightsCtrl.new)

//POST /flights
router.post('/', flightsCtrl.create)

export {
  router
}
