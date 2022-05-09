const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FnYXJrdW1hcm5lZWwiLCJhIjoiY2wycm91NWx5MDNjcDNjdW81emV0ZmZteiJ9.54mV12VkVcIaIaWpXRU_hg&limit=1'
 
    request({ url, json: true }, (error, {body}) => {
       if (error) {
          callback('Unable to location to services!', undefined)
       }else if (body.features.length === 0) {
          callback('unable to find loctaion. try another search', undefined)
       } else {
           callback(undefined, {
              latitude: body.features[0].center[0],
              longitude: body.features[0].center[1],
              location: body.features[0].place_name
           })
       }
    })
 }
 
 module.exports = geocode