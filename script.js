const mainContainer = document.querySelector(".main-container");


const count = 10;
const key = "euEq3b0xfKd103wyAbj-XyK8BEhFGASxfMa799GaZd4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;


async function getImages(apiUrl){
    let result = await fetch(apiUrl);
    let data = await result.json();
    return data;
}


// function that creates 30 containers , add images from api to the sub container , finally add the sub containers upto the mainContainer
const mainFunction = () => {
    
    let imageResult = getImages(apiUrl);
    //function that takes image from api and add as the background image to the div provided
    const addImage = (div , i) => {

        imageResult.then((result) => {

            let imageUrl = result[i].urls.regular;
            let imageAlt = result[i].alt_description;

            let image = document.createElement("img");
            image.setAttribute("src" , imageUrl);
            image.setAttribute("alt" , imageAlt);
            image.style.objectFit = "cover";
            image.style.width = "100%";
            image.style.height = "100%";


            // when image is not loaded
            let loader = document.createElement("img");
            loader.setAttribute("src" , './loader.svg');
            div.style.position = "relative";
            loader.style.position = "absolute";
            loader.style.left = "25%";
            loader.style.top = "25%";
            div.appendChild(loader);

            image.addEventListener("load" , ()=> {
                div.removeChild(loader);
                div.appendChild(image);

            })

        }).catch((error) => {
            let loader = document.createElement("img");
            loader.setAttribute("src" , './loader.svg');
            loader.style.position = "absolute";
            loader.style.left = "25%";
            loader.style.top = "25%";
            div.appendChild(loader);
        })


    }


    // function that creates the number of sub containers
    const createBoxes = (count) => {
        for(let i=0 ; i<count ; i++){
            let div = document.createElement("div");
            div.style.height = "400px";
            div.style.width = "400px";
            div.style.margin = "50px";
            div.style.backgroundColor = "#ddd";

            addImage(div , i);

            mainContainer.appendChild(div);
        } 
    //    mainContainer.style.gridTemplateColumns = `repeat(${3} , 1fr)`;
    //    mainContainer.style.gridTemplateRows = `repeat(${(count/3)} , 1fr)`;
    }

    createBoxes(count);

}

// this function does the main work that is showing the gallery;
mainFunction();


// making the gallery infinitely scrollable
// for that using scroll event and checking the sccrollY value and comparing it to the document.body.offSetHeight

document.addEventListener("scroll" , () => {
    let offsetHeight = document.body.offsetHeight;
    let scrolled = window.scrollY;
    
    console.log(offsetHeight , scrolled);
    
    if((offsetHeight - scrolled) <= 1000){
        mainFunction();
    }
})


