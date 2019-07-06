const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
    const url = `https://api.darksky.net/forecast/7485b3d010ab0135a73ba24a495810ba/${latitude},${longitude}`

    request({url: url, json:true, qs:{units:'si'}}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast services', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const {temperature, precipProbability} = body.currently
            const {summary, temperatureLow, temperatureHigh} = body.daily.data[0];

            callback(undefined, `${summary} It is currently ${temperature} degrees out. The high for today is ${temperatureHigh} and the low is ${temperatureLow}. There is a ${precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast