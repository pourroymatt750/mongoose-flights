import { Flight } from '../models/flight.js'

function newFlight(req, res) {
    const newFlight = new Flight()
    const defaultDate = newFlight.departs
    const formattedDate = defaultDate.toISOString().slice(0,16)
    const allowedFlightNo = newFlight.flightNo
    res.render('flights/new', {
        title: "Add Flight",
        flightNo: allowedFlightNo,
        departs: formattedDate
    })
}

function create(req, res) {
    if (req.body.cast) {
        req.body.cast = req.body.cast.split(', ')
    }
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Flight.create(req.body)
    .then(flight => {
        res.redirect('/flights/new')
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights/new')
    })
}

export {
    newFlight as new, 
    create
}