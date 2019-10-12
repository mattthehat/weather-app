const path = require('path')
const express = require('express');
const hbs = require('hbs');
var sass = require('node-sass-middleware');

const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const sassPath = path.join(__dirname, '../sass');
const cssPath = path.join(__dirname, '../public/css');


// Setup static directory 
app.use(express.static(publicPath));

app.use(
    sass({
        src: sassPath, // Input SASS files
        dest: cssPath, // Output CSS
        debug: true
    })
);

// Setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Matt Rosser'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        msg: 'A simple weather app built with Express JS'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        'msg': 'Help section coming soon!'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {
        details,
        latitude,
        longitude
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forcast(latitude, longitude, 'uk2', (error, forcastData) => {
            if (error) return res.send({
                error
            });
            return res.send({
                details,
                forcast: forcastData
            });
        });
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: '404 Not Found'
    });
});

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404 Not Found'
    });
})

// Run server
app.listen(port, () => {
    console.log('Server running');
});