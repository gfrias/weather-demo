const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Guillermo Frias'
    })
})

app.get('/about', (req, res) => { 
    res.render('about', {
        title: 'About me',
        name: 'Guillermo Frias'
    })
})

app.get('/help', (req, res) => { 
    res.render('help', {
        title: 'Help',
        name: 'Guillermo Frias',
        helpText: 'this is some help text'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }
    
        forecast(data, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location: data.location,
                forecastData,
                address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Guillermo Frias',
        message: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Guillermo Frias',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})