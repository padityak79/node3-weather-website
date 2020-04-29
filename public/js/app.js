const form = document.querySelector('.main-content form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const input = form.querySelector('input')

input.addEventListener('keydown', ()=> {
    if(!input.value) {
        messageOne.textContent = ''
        messageTwo.textContent = ''
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    const address = form.querySelector('input').value;
    fetch('http://localhost:3000/weather?address='+address)
    .then(response => {
        response.json().then(
        ({location,forecast,error} = {}) => {
            if(error){
                messageOne.textContent = error;
            } 
            else {
                messageOne.textContent = location;
                messageTwo.textContent = forecast;
            }
        })   
    })
})

// fetch('http://localhost:3000/weather?address=!')
//     .then(response => {
//         response.json().then(
//         ({location,forecast,error} = {}) => {
//             if(error) console.log(error);
//             else {
//                 console.log('location :',location)
//                 console.log('forecast :',forecast);
//             }
//         })   
//     })
//     .catch(error => {
//         console.log(error);
//     })
