const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hanldebarsengine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Hritik Ranjan"
    }) 
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name:'Hritik Ranjan'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help page',
        name: 'Hritik Ranjan',
        message: 'Please help me! Uncle jee mera gala sukh rha h....mujhe paani pila jiye'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        // console.log("Data: ", data)
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address    
            })
            console.log(location)
            console.log(forecastdata)
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a seach term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: "Hritik Ranjan",
        errorMessage: "Help article not found!"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: "Hritik Ranjan",
        errorMessage: "Page not found!"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


//Command to run nodemon enabling hbs:
//nodemon src/app.js -e js,hbs