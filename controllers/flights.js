import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

function newFlight(req, res) {
    const newFlight = new Flight()
    const defaultDate = newFlight.departs
    const formattedDate = defaultDate.toISOString().slice(0,16)
    res.render('flights/new', {
        title: "Add Flight",
        departs: formattedDate
    })
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Flight.create(req.body)
    .then(flight => {
        res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

function index(req, res) {
    Flight.find({})
    .then(flights => {
        res.render('flights', {
            title: 'All Flights',
            flights: flights
        })
    })
}

function show(req, res) {
    Flight.findById(req.params.id)
    .populate('meals')
    .then(flight => {
        Meal.find({_id: {$nin: flight.meals}})
        .then(meals => {
            res.render('flights/show', {
                title: 'Flight Details',
                flight: flight,
                meals: meals
            })  
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect("/flights")
    })
    .catch(error => {
        console.log(error)
        res.redirect("/")
    })
}

function edit(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        res.render('flights/edit', {
            title: "Edit Flight",
            flight: flight
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function update(req, res) {
    for (let key in req.body) {
        if (req.body[key] === "") delete req.body[key]
    }
    Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(flight => {
        res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function createTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.tickets.push(req.body)
        flight.save() 
        .then(() => {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

function addMeal(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.meals.push(req.body.mealId)
        flight.save()
        .then(() => {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

export {
    newFlight as new, 
    create,
    index,
    show,
    deleteFlight as delete,
    edit,
    update,
    createTicket,
    addMeal
}