const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: '0cc1e6fa15594d0296ec5cd3f69d8ead',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'))
    rollbar.info('Html was monitored successfully!')
})

//STUDENT STUFF -=----------------------------------------------------------------------------------------------

const studentArr = []

app.post('/api/students', (req, res) => {
    const { name } = req.body
    // const name = req.body.name
    studentArr.push(name)

    // rollbar.log('Student successfully added!')
    rollbar.critical("student not added")
    res.status(200).send(studentArr)
})

const port = process.env.PORT || 5656

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Hippity Hoppity your server is poppening on port: ${port}`))