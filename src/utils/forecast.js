const request = require('request')


const forecast = (lat, long, callback)=>{
    debugger;
    const url = `https://api.darksky.net/forecast/dd02f21e151133def0cef98884830f3f/${lat},${long}?units=si`

    request({url, json:true}, (error, { body })=>{
        if(error){
            callback('Low level error, check connection', undefined)
        } else if (body.error){
            callback('Error in place name, please try again', undefined)
        } else {
            callback(undefined, `It is currently ${body.currently.temperature}'C degrees outside with a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast