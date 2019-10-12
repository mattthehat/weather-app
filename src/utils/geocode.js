const request = require('request');
const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibWF0dHRoZWhhdCIsImEiOiJjam9kMWlhdnYyMTVjM3BvZHl0YTEwOTA1In0.Q9g0a-5yIZWeqOCPbaO5QQ&limit=1`;

    request({
            url,
            json: true
        },
        (err, {
            body
        }) => {
            if (err) {
                callback('Unable to connect to location services', undefined);
            } else if (!body.features || body.features.length === 0) {
                callback('Unable to find location. Try another search', undefined);
            } else {
                callback(undefined, {
                    details: body.features[0].place_name,
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0]
                })
            }
        }
    )
}

module.exports = geocode;