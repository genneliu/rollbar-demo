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


// app.post('/api/students', (req, res) => {
//     try {
//         const { name } = req.body
//         // const name = req.body.name
//         studentArr.push(name)
//         rollbar.log('Student successfully added!')
//         res.status(200).send(studentArr)
//     }
//     catch (err) {
//         rollbar.critical("not found")
// })


// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, './client/food.html'))
//     rollbar.warning('WARNING')
// })



// app.get('/', (req, res, hello) => {
//     res.sendFile(path.join(__dirname, './client/foods.html'))
//     rollbar.critical('CRITICAL')

// })

const port = process.env.PORT || 5666
app.use(rollbar.errorHandler())

app.listen(port, () => {
    console.log(`Good Server: ${port}`)
});



