console.log('Hi there world')


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

let form = document.querySelector('form')
let search = document.querySelector('input')

let messageOne = document.getElementById('responseTitle');
let messageTwo = document.getElementById('responseBody');

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value;

    // remove current Values
    messageOne.innerText='';
    messageTwo.innerText='';

    // loading message
    messageOne.textContent="loading results"

    // fetch request

    fetch(`http://localhost:3000/weather?address=${location}`).then((responce) => {
    responce.json().then((data)=>{
        if(data.error){
            // if error print error to p tag
            messageOne.textContent=`${data.error}`
            console.log(data.error)
        } else {
            messageOne.textContent=`${data.location}`
            messageTwo.textContent=`${data.forecast}`

            console.log(`location: ${data.location}`)
            console.log(`Temp: ${data.forecast}`)
            console.log(`address: ${data.address}`)
        }
    })
})

    console.log(`${location}`)
})