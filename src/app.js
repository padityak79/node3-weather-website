const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

//Express config.
const publicFilePath = path.join(__dirname,'../public')
const viewsPath =path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directory to serve
app.use(express.static(publicFilePath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Kradi3909'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Kradi3909'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Kradi3909'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData = '') => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })
    
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found',  
        name: 'Kradi3909'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: '404 ',
        errorMessage: 'My 404 page',  
        name: 'Kradi3909'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})