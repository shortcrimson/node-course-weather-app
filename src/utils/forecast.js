const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/42d47f8061d1f29139ea1bb79d61bc9a/' + latitude + ',' + longitude + '?units=si'
	request({url, json: true}, (error, {body} = {}) => {
		if (error) {
			callback('Unable to connect to forecast service')
		} else if (body.error) {
			callback('API Error - ' + body.error)
		} else {
		let curTemp = body.currently.temperature
		let curPrecipProb = body.currently.precipProbability
		let summary = body.daily.data[0].summary
		let minTemp = body.daily.data[0].temperatureMin
		let maxTemp = body.daily.data[0].temperatureMax
		let forecastStr = summary + ' It is currently ' + curTemp + ' degrees out. There is a ' + curPrecipProb + '% chance of rain. Minimum temperature is ' + minTemp + ' degrees. Maximum temperature is ' + maxTemp + ' degrees.'
		callback(undefined, forecastStr)
		}
	})
}

module.exports = forecast