const request = require('request')

const geocode = (address, callback) => {
    const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`

    const qs = {
        access_token: 'pk.eyJ1IjoiZ2ZyaWFzIiwiYSI6ImNqeG5iYzNxcTBjdHQzZ2xpbno0aWJueXMifQ.0W6RBCAZQ5hP1dt0n0hiSA',
        limit:1
    }

    request({url: urlMapBox, json:true, qs: qs}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const {center, place_name:location} = body.features[0]
            const [longitude, latitude] = center

            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode