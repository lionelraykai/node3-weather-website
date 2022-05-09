const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9b89eda78601af05d412e281c78b5206&query=' + latitude + ',' + longitude + '&units=f'
    
    request({ url, json: true }, (error,{body}) => {
      if(error) {
         callback('not internet', undefined)
      } else if (body.error) {
          callback('unable to location', undefined)
      } else {
         console.log(body.current)
         callback( undefined, body.current.weather_descriptions[0] + ". it is currently " + body.current.temperature + " degress out , it feels like "  + body.current.feelslike + " degress out. the humidity is " + body.current.humidity + "%.")
      }
   })
}

module.exports = forecast