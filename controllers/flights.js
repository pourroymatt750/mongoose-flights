import { Flight } from '../models/flight.js'

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
    if (req.body.cast) {
        req.body.cast = req.body.cast.split(', ')
    }
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Flight.create(req.body)
    .then(flight => {
        res.redirect('/flights')
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
    .then(flight => {
        res.render('flights/show', {
            title: 'Flight Details',
            flight: flight
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

export {
    newFlight as new, 
    create,
    index,
    show,
    deleteFlight as delete,
    edit,
    update
}