const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utile/geocode')
const forecast = require('./utile/forecast')
const { query } = require('express')
const { resourceUsage } = require('process')


const app = express()
const port = process.env.PORT || 5000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Leo Ray'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'Leo Ray'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
       helptext: 'This is some helpful text',
       title: 'Help',
       name: 'Leo Ray'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No Address'
       })
    }
 
geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
       if (error) {
           return res.send({error})
       }

       forecast(latitude, longitude, (error, forecastdata) => {
           if (error) {
               return res.send({error})
           }

           res.send({
               forecast: forecastdata,
               location,
               address: req.query.address
           })
       })
})

    res.send({
        forecast: 'its sunny out there',
        location: 'una himachal pradesh',
        address: req.query.address
    })
})



app.get('/products', (req, res) => {
    if (!req.query.serach) {
     return res.send({
         error: 'You must provide a search term'
     })
    }
    

    console.log(req.query.serach)
    res.send({
       products: []
   })
})

app.get('/help/*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'Andrew Mead',
       errorMassage: 'Help Article is not Found'
   })
})

app.get('*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'Andrew Mead',
       errorMassage: 'Page Not Found'
   })
})


app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})
