const express = require('express')
const router = express.Router()

const Person = require('../models/Person')

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        res.send(people)
    })
})

router.post('/person', function (req, res) {
    let p = new Person( { firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age } )
    p.save()
    res.end()
})

router.put('/person/:id', function (req, res) {
    Person.findByIdAndUpdate(req.params.id, { age: 80 }, { new: true }, function (err, person) {
        console.log(person)
        res.end()
    })
})

router.delete('/apocalypse', function (req, res) {
    Person.deleteMany({})
    res.end()
})

module.exports = router
