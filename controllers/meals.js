import { Meal } from "../models/meal.js"

function newMeal(req, res) {
    Meal.find({})
    .then(meals => {
        res.render('meals/new', {
            title: 'Add Meal',
            meals
        })
    })
}

function create(req, res) {
    Meal.create(req.body)
    .then(meal => {
        res.redirect('/meals/new')
    })
}

function deleteMeal(req, res) {
    Meal.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/meals/new')
    })
}

export {
    newMeal as new,
    create,
    deleteMeal as delete
}