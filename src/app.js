/*
    load in express - it is not a core module so needs to loaded into your project via
    npm

    load path as a core node module so does not need NPM
*/ 

const express = require('express')
const path = require('path')

const hbs = require('hbs')

// add in the utils

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

/* create a var which holders the express function (express is a function)
You can then listen to app and run the express functions from it using >>> app.function */ 

const app = express()
const port = process.env.PORT || 3000

// create path for dir names
// path.join takes two arguments (__dirname, 'path from this file to correct path')
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views') // << create path for templates
const partialsPath = path.join(__dirname, '../template/partials')

/*
    to set up handle bars you use app.set
    it takes 2 arguments ('what it is', 'where it is i.e. the module')
*/ 

// set handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath); // <<<< set up custom path for the .hbs templates

// set up partials path
hbs.registerPartials(partialsPath)

// set up static Dir to serve
app.use(express.static(publicDir))


/* this time the app.get is going to use, res.render('file name but not .html')
we have set up express to use the view file, which is what render looks at I think? 
so we just need give it the name required
*/ 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        titleMessage: 'whats the weather like today?',
        name: 'Wally the web dev',
        year: 2020
    })
})

// create the help dynamic page

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        titleMessage: 'Sorry to hear your having some issues, how can we help?',
        name: 'Wally the web dev',
        year: 2020
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Acout Page',
        titleMessage: 'Welcome to the about page!',
        name: 'Wally the web dev',
        year: 2020
    })
})

/* app.get lets you say what we should be sending back when someone tries to accsess your URL
    maybe we should send back html or maybe JSON
    req = request // this is a obj with info about what is be asked of the server
    res = responce // methods alowing us to customize what is sent back to the requester
    domain is called route
    syntax is - app.get('domain', (callback)=>{}) 
    note - if domain is root domain i.e. app.com the domain is blank app.get('', ()=>{})
*/ 


app.get('/weather', (req, res)=>{

    // if query is 0 - return error JSON
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    
    geoCode(req.query.address, (error, {lat, long, place} = {}) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({ error: error })
            }
            return res.send({
                location: place,
                temp: forecastData.temp,
                rainPercent: forecastData.rainPercent,
                summary: forecastData.summary,
                address: req.query.address
            })
        })
        
    })
})


/* Cannot set headers after they are sent to the client
    this is caused by two res.send - in below, the if statment will return res.send ending the
    running function - http can only make one send so if this error is shown it means there 
    is two res.send (if not more) being run by the function (first one will show, error is generated
    by the second)
*/ 

app.get('/products', (req, res) => {
    if(!req.query.seach){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

// setting up a 404 error <<< must come last

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help/ Page exstention does not exist',
        titleMessage: 'You have enetered a link help/example << which does not exist'
    })
})


// using wild card * means in /X <<< is not found
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        titleMessage: 'page does not exist'
    })
})


/* app.listen(port number, callback function)
    the below starst the app at port 3000 whcih is a common debugging port for dev work
    and initiates a call back function to say running 
    NOTE: the server will run until it is closed by command C in console
*/ 



// this value is used for the local host on your PC 
app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})

// when using heroku you need to change this
