const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_API_KEY,
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
    const { names } = req.body
    const name = req.body.name
    studentArr.push(name)

    rollbar.log('Student successfully added!')
    // rollbar.warning("warning student not added")
    // res.status(200).send(studentArr)
})

app.get('/api/message', (req, res) => {
    const message= "Ami tomake valobashi";
    rollbar.info("Message successfully sent")
    res.status(200).send(message);
  });


const port = process.env.PORT || 5656

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Hippity Hoppity your server is poppening on port: ${port}`))