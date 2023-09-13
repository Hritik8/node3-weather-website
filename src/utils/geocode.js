const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=34261a2e2138674633ef6799c28d6350&query=1600'+address
    request({url , json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.error || body.data.length === 0) {
            callback('Unable to find location, Try another search', undefined)
        } else {
            const results = body.data[0]
            callback(undefined, {
                latitude: results.latitude,
                longitude: results.longitude,
                location: results.label
            })
        }
    })
}

module.exports = geocode
