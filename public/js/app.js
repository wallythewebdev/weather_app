console.log('Hi there world')


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

let form = document.querySelector('form')
let search = document.querySelector('input')

let currentTemp = document.getElementById('responseTitle');
let rainChance = document.getElementById('responseBody');
let summary = document.getElementById('summary');

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value;

    // remove current Values
    currentTemp.innerText='';
    rainChance.innerText='';
    summary.innerText="";

    // loading message
    currentTemp.textContent="loading results"

    // fetch request

    fetch(`/weather?address=${location}`).then((responce) => {
    responce.json().then((data)=>{
        if(data.error){
            // if error print error to p tag 
            currentTemp.textContent=`${data.error}`
            console.log(data.error)
        } else {
            currentTemp.textContent=`Current Temp: ${data.temp}'c`
            rainChance.textContent=`${data.rainPercent}% of rain`
            summary.textContent = `Summary in ${data.address} is ${data.summary}`

            console.log(`location: ${data.location}`)
            console.log(`Temp: ${data.forecast}`)
            console.log(`address: ${data.address}`)
        }
    })
})

    console.log(`${location}`)
})