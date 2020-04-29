const request = require('postman-request');


const geocode = ( address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGFkaXR5YWs3OSIsImEiOiJjazlmaXV3MmYwYnRsM2x0YnNvcWhvcTdsIn0.g7xOazEnceDfjz4Wu-vU2w&limit=1';
    request({url, json: true}, (error,{body} ={}) => {
        const {features} = body;
        if(error){
            callback('Unable to connect to location service!');
        } else if(features.length === 0) {
            callback('Unable to find the location. Try another search');
        } else {
            callback(undefined, { 
                latitude: features[0].center[1], 
                longitude: features[0].center[0], 
                location: features[0].place_name
            });
        }    
    })
}

module.exports = geocode;