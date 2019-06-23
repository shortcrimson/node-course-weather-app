const path = require('path')
const chalk = require('chalk')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Toby'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Toby'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Weather app help',
		helpMessage: 'What can I help you with?',
		name: 'Toby'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide an address'
		})
	}
	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({error})
		} else {
			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({error})
				}
				res.send({
					location,
					forecastData
				})
			})
		}
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'Search for something!'
		})
	}
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		error: 'Help page not found',
		name: 'Toby'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		error: 'Page not found',
		name: 'Toby'
	})
})

app.listen(port, () => {
	console.log('Server is running on port ' + port)
})