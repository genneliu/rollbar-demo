const express = require('express')
const { truncateSync } = require('fs')
const path = require('path')
const app = express()

app.use(express.json())

const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: '57e20f10488d49f9af1013267c7434ea',
    captureUncaught: true,
    captureUnhandledRejections: true,
})


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './client/index.html'))
    rollbar.info('HTML successful!')
})


app.post('/api/students', (req, res) => {
    try {
    const { name } = req.body
    // const name = req.body.name
    studentArr.push(name)
    rollbar.log('Student successfully added!')
    res.status(200).send(student)
    }
    catch (err) {
        rollbar.critical("not found")
})

// app.get('/api/food', (req, res) => {
//     try {
//         res.sendFile(path.join(__dirname, './client/food.html))
//         rollbar.info('HTML successful!')
//     }
//     catch (err) {
//         alert(err + "not working")
//         rollbar.warning("food endpoint doesn't exist")
//         res.status(400)
//     }
// })



const port = process.env.PORT || 5666
app.use(rollbar.errorHandler())

app.listen(port, () => {
    console.log(`Good Server: ${port}`)
});



