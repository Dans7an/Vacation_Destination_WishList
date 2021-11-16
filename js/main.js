document.querySelector('.AddToList').addEventListener('click', submitForm)
document.querySelector('#Edit').addEventListener('click', editCard)
document.querySelector('#Remove').addEventListener('click', removeCard)

// VARIABLES FOR INPUTS AND TEXTAREA
const inputs = document.querySelectorAll('input');
const textArea = document.querySelector('textarea')

// VARIABLES FOR CARD
let cardName = document.querySelector('h5')
let cardLocation = document.querySelector('h6')
let cardPhoto = document.querySelector('img')
let cardDescription = document.querySelector('.card-text')

let title = document.querySelector('h2')

// DEFAULT PHOTO
let defaultPhoto = "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg"

function submitForm(){
    //  CAPTURES ALL THE TEXT FIELDS
    let name = inputs[0].value;
    let location = inputs[1].value;
    let photo = inputs[2].value;
    let desciption = document.querySelector('textarea').value; 

    // INSERT INFO INTO CARD
    if(name.length > 1 && location.length > 1){
        title.innerText = "My WishList"
        document.querySelector('.card').classList.remove('makeCardVisible')
        cardName.innerText = name;
        cardLocation.innerText = location;
        photo.length > 1 ? cardPhoto.setAttribute('src',photo) : cardPhoto.setAttribute('src',defaultPhoto);
        cardDescription.value = desciption;    
    }

    console.log(inputs);
    console.log("1");
    console.log(name);
    console.log(location);
}

function editCard(){
    let newName = prompt('Enter new name')
    let newLocation = prompt('Enter new location')
    let newPhotoUrl = prompt('Enter new photo url')

    // INSERT INFO INTO CARD
    if(newName.length > 0){
        cardName.innerText = newName;
    }
    if(newLocation > 0){
        cardLocation.innerText = newLocation;
    } 
    newPhotoUrl.length > 1 ? cardPhoto.setAttribute('src',newPhotoUrl) : cardPhoto.setAttribute('src',defaultPhoto);
    console.log(newName);
}

function removeCard(){
    title.innerText = "Enter destination details"
    document.querySelector('.card').classList.add('makeCardVisible')
}