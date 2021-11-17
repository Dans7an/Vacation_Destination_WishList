document.querySelector('.AddToList').addEventListener('click', submitForm)
document.querySelector('.row').addEventListener('click', editCard)
document.querySelector('.container').addEventListener('click', removeCard)

var form = document.getElementsByName('destinationForm')[0];

// VARIABLES FOR INPUTS AND TEXTAREA
const inputs = document.querySelectorAll('input');
const textArea = document.querySelector('textarea')

let title = document.querySelector('h2')

// DEFAULT PHOTO
let defaultPhoto = "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg"

// VARIABLES FOR API
const unsplashApiKey = 'wQuC3g7JmlN_8yTfq4Hk9247zZRTDzpaZSQyE1b32bE' 
const weaherApiKey = 'caab8d07c64bfd5f209298466bc24262'

function submitForm(){
    //  CAPTURES ALL THE TEXT FIELDS
    let name = inputs[0].value;
    let location = inputs[1].value;
    let desciption = document.querySelector('textarea').value; 

    // INSERT INFO INTO CARD
    if(name.length > 1 && location.length > 1){
        title.innerText = "My WishList"
        createDestination(name,location,desciption)
        form.reset();
    }

}

function editCard(event){
    let aim = event.target;

    if(aim.matches('#Edit')){
        let editName = aim.parentNode.parentNode.childNodes[0]
        let editLocation = aim.parentNode.parentNode.childNodes[1]
        let editImage = aim.parentNode.parentNode.parentNode.childNodes[0]

        let newName = prompt('Enter new name')
        let newLocation = prompt('Enter new location')
    
        // INSERT INFO INTO CARD
        if(newName.length > 0){
            editName.innerText = newName;
        }
        if(newLocation.length > 0){
            editLocation.innerText = newLocation;
            getImageFromAPI(editImage,editLocation)
        } 
        
    }

}

function removeCard(event){
    let aim = event.target
    if(aim.matches('#Remove')){
    aim.parentNode.parentNode.parentNode.remove();
    }
}

function getImageFromAPI(elem, apiLocation){
    fetch(`https://api.unsplash.com/search/photos?query=${apiLocation}&client_id=${unsplashApiKey}`)
    .then(res => res.json())
    .then(data => {
        const arraySize = data.results.length
        const randomNumber = Math.floor(Math.random() * arraySize)
        let imageUrl = data.results[randomNumber].urls.raw
        // console.log("here " + arraySize)
        // console.log(data.results[randomNumber].urls);
        elem.src = imageUrl
    })
    .catch(err => {
        console.log(`error ${err}`);
      })
}

function getLocationWeather(elem, apiLocation){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${apiLocation}&units=imperial&appid=${weaherApiKey}`)
    .then(res => res.json())
    .then(data => {
        let weatherTemperature = `${data.main.temp} F`
        let weatherDescritiption = data.weather[0].description
        elem.innerText = `${weatherTemperature} ${weatherDescritiption}`
        console.log(weatherTemperature)
      })
      .catch(err => {
        console.log(`error ${err}`);
      })
}

function createDestination(destinationName,location,  description){

    // Create the body of the card
    let card = document.createElement('div')
    card.setAttribute('class','card')
    card.style.width = '15rem'

    // Create the image
    var cardImage = document.createElement('img')
    cardImage.setAttribute('class','card-img-top')
    getImageFromAPI(cardImage, location)    // used this function since JS is async, so results in a promise

    // Create the card body
    let cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')

    // Create the card titles
    let cardH5 = document.createElement('h5')
    cardH5.setAttribute('class','card-title')
    cardH5.innerText = destinationName

    let cardH6 = document.createElement('h6')
    cardH6.setAttribute('class','card-title')
    cardH6.innerText = location

    let descriptionP = document.createElement('p')
    descriptionP.setAttribute('class','card-text')
    descriptionP.innerText = description

    // Current weather
    let weather = document.createElement('span')
    getLocationWeather(weather,location)

    // Create the card buttons
    let cardButtonDiv = document.createElement('div')
    cardButtonDiv.setAttribute('class','buttons')
    
    let cardEdit = document.createElement('a')
    cardEdit.setAttribute('class', 'btn btn-warning')
    cardEdit.setAttribute('id','Edit')
    cardEdit.innerText = 'Edit'

    let cardRemove = document.createElement('a')
    cardRemove.setAttribute('class', 'btn btn-danger')
    cardRemove.setAttribute('id','Remove')
    cardRemove.innerText = 'Remove'

    // Attaching image and cardBody to card
    card.append(cardImage)
    card.append(cardBody)

    // Attaching the card titles onto the card body
    cardBody.append(cardH5)
    cardBody.append(cardH6)
    cardBody.append(descriptionP)
    cardBody.append(weather)

    // Attaching card buttons to card body
    cardButtonDiv.append(cardEdit,cardRemove)
    cardBody.append(cardButtonDiv)

    // Attaching the card to the card body
    document.querySelector('.row').append(card)
}

// wQuC3g7JmlN_8yTfq4Hk9247zZRTDzpaZSQyE1b32bE    Access Key
// HaZutscWaJSJN6hhCHmBIv_ADIKupyVB3NT5aeqKmvE      Secret key