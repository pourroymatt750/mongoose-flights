import { Router } from "express"
import * as mealsCtrl from '../controllers/meals.js'

const router = Router()

//GET request to localhost:3000/meals/new
router.get('/new', mealsCtrl.new)

//POST request to localhost:3000/meals
router.post('/', mealsCtrl.create)

router.delete('/:id', mealsCtrl.delete)

export {
    router
}