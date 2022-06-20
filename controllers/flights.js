import { Flight } from '../models/flight.js'

function newFlight(req, res) {
    res.render('flights/new', {
        title: "Add Flight"
    })
}

function create(req, res) {
    Flight.create(req.body)
    .then(flight => {
        res.redirect('/flights')
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

export {
    newFlight as new, 
    create
}