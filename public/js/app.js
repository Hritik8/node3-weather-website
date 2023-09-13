
console.log("Client side JavaScript file is laoded")

// fetch('http://localhost:3000/weather?address=Pennsylvania%20Ave%20NW,%20Washington%20DC').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log("Error", data.error)
//         }
//         console.log(data.location)
//         console.log(data.forecast)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent =  data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent =  data.forecast
        }
    })
})
})