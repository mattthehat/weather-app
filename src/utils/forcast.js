const request = require('request');
const forcast = (lat, long, units, callback) => {
    const url = `https://api.darksky.net/forecast/62a69ad7859a0475b41f6955817a94db/${lat},${long}?units=${units}`;
    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to find weather for chosen location', undefined);
        } else {
            callback(undefined, `${body.currently.summary}. The temperature is ${body.currently.temperature}°C, with a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forcast;