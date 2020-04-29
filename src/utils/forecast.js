const request = require('postman-request')

const forecast = function( latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=11e2cbbf2ae9766b6c31541f1c0bbaea&query=' + latitude + ','+ longitude + '&units=m';

        request({url , json: true}, (error,{body} = {}) => {
            if(error) {
                callback('Unable to connect to weather service!');
            } else if(body.error || !body.location.name) {
                callback('Unable to find the location');
            } else {
                callback(undefined, body.current.weather_descriptions[0] + '. The tempreture is '+body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.' );
            }
        })
    
}

module.exports = forecast;