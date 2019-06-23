console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', e => {
	e.preventDefault();

	msg1.textContent = 'Loading...'
	msg2.textContent = ''

	const url = '/weather?address=' + search.value

	fetch(url).then(response => {
		response.json().then(({error, location, forecastData}) => {
			if (error) {
				// console.log('Error - ' + error)
				msg1.textContent = error
			} else {
				// console.log(location)
				// console.log(forecastData)
				msg1.textContent = location
				msg2.textContent = forecastData
			}
		})
	})
})