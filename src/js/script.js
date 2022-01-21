const image   = document.querySelector('.image')
const title   = document.querySelector('.description')
let pics      = {}
let currentPic= 0


//CAPTURAR LOCALIZAÇÃO DO USUÁRIO
let latitude    = 0
let longitude   = 0

function getUserPosition(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
        
            latitude  = position.coords.latitude
            longitude = position.coords.longitude
            return {latitude, longitude}
        })
    }else{
        latitude  = -23.5284
        longitude = -39.2733        
    }
}

getUserPosition()


//CAPTURAR A PESQUISA DO USUÁRIO
function getSearch(){
    let searchInput  = document.querySelector('.searchInput')
    let text         = searchInput.value
    return text
}


//REQUISITAR FOTOS DA API DO FLICKR
async function currentURL(){
    pics          = {}
    let text      = getSearch() 
    let response  = await fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=b8bce839484fb43c6869bec38d4f0852&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${latitude}&lon=${longitude}&text=${text}`)
    let data      = await response.json()
    pics = data
    return data
}


//CONSTRUIR PRIMEIRA IMAGEM
async function constructFirstImg(){
    let data      = await currentURL()
    let pic       = await data.photos.photo[0]
    let url       = constructImageURL(pic)
    image.src     = url
    title.innerText = pic.title
    return url
}

let searchButton = document.querySelector('.searchButton')
searchButton.addEventListener('click', constructFirstImg)


//CONSTRUIR URL SOURCE DA IMAGEM  A SER RENDERIZADA
function constructImageURL (photoObj) {
    return "https://farm" + photoObj.farm +
    ".staticflickr.com/" + photoObj.server +
    "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}


//BOTÃO PASSAR PARA A DIREITA
const rightButton = document.querySelector('#rightButton')
rightButton.addEventListener('click', ()=>{
    
    if(currentPic +1 === pics.photos.photo.length){
        currentPic = 0
    }
    else{
        currentPic++
    }

    let newURL      = constructImageURL(pics.photos.photo[currentPic])
    image.src       = newURL
    title.innerText = pics.photos.photo[currentPic].title
})


//BOTÃO PASSAR PARA A ESQUERDA
const leftButton = document.querySelector('#leftButton')
leftButton.addEventListener('click', ()=>{
    
    if(currentPic === 0){
        currentPic = pics.photos.photo.length -1
    }
    else{
        currentPic--
    }
    let newURL      = constructImageURL(pics.photos.photo[currentPic])
    image.src       = newURL
    title.innerText = pics.photos.photo[currentPic].title

})