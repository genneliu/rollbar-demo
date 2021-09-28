const express = require('express')
const { truncateSync } = require('fs')
const path = require('path')
const app = express()

const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: '57e20f10488d49f9af1013267c7434ea',
    captureUncaught: true,
    captureUnhandledRejections: true,
})


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './client/index.html'))
})

const port = process.env.PORT || 5666
app.use(rollbar.errorHandler())

app.listen(port, () => {
    console.log(`Good Server: ${port}`)
});



