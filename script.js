const APIKey='ZBpoCu1btG6BzJ5E1-W-COKJB-9NiyHW9m84kNzbf40';
let count=3;
const UnsplashUrl=`https://api.unsplash.com/photos/random/?client_id=${APIKey}&count=${count}`;

const imageContainer=document.getElementById("image-container");
const loader=document.getElementById("loader");
let photosArray=[];

let ready=false;
let imagesLoaded=0;
let totalImages=0;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded==totalImages){
        ready=true;
        loader.hidden=true;
        count=30;
    }
}

function setAttribute(element, attributes){
   for (const key in attributes){
    element.setAttribute(key,attributes[key])
   }
}

function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    photosArray.forEach((photo)=>{
        imageLoaded();
        const item=document.createElement("a");
        setAttribute(item,{
            href:photo.links.html,
            target:'_blank'
        });
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('alt',photo.alt_description);
        const image=document.createElement("img");
        setAttribute(image,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        // image.setAttribute('src',photo.urls.regular);
        // image.setAttribute('alt',photo.alt_description);
        // image.setAttribute('title',photo.alt_description);
        item.appendChild(image);
        imageContainer.appendChild(item);
    })
}

async function getPhotos(){
    const respose=await fetch(UnsplashUrl);
    photosArray=await respose.json();
    displayPhotos();
}

//evenListener for triggering to load more photos while scrolling
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
        
    }
})

//Onload
getPhotos();