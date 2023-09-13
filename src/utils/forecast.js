const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=cc570e4502f21b6263e61f305eece7e5&query='+ latitude + ',' + longitude +'&units=f'
  request({url , json: true}, (error, { body }) => {
      if(error){
          callback("Unable to connect to weather service", undefined)
      } else if(body.error){
          callback("Unable to find location, Try another search", undefined)
      } else {
          callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} fahrenheit out. It feels like ${body.current.feelslike} fahrenheit out.`)
      }
  })
}

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=cc570e4502f21b6263e61f305eece7e5&query='+ latitude + ',' + longitude +'&units=f'
//     request({url:url, json: true}, (error,response) => {
//         if(error){
//             callback("Unable to connect to weather service", undefined)
//         } else if(response.body.error){
//             callback("Unable to find location", undefined)
//         } else {
//             callback(undefined,`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} fahrenheit out. It feels like ${response.body.current.feelslike} fahrenheit out.`)
//         }
//     })
//   }

module.exports = forecast
