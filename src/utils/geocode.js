const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoid2FsbHl0aGV3ZWJkZXYiLCJhIjoiY2s2dGUybW8xMG9hNzN1dDk5Z3Vlbm41bCJ9.P26Vgn7LyxFqGUPFpcugQA&limit=1`

    /*
        URL << change made  
        because the var name URL and object key and value are the same instead of url: url you can short hand this to just url
        request({url: url, json: true} >>>>>>>>>>>>>> request({url, json: true}

        reponce << change made
        responce is returning the http object body, we accsess it via, responce.body.X 
        but it can be desctructured to { body } as it is a object being returned
    */ 
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location try another search', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode