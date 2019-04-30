$(document).ready(function () {
    var sectionMap = document.getElementById("sectionMapa");   
    getMyPosition();
    getPlaces();
});

var placesInfo =[];
function getPlaces(){
    fetch("info.json")
    .then(response => response.json())
    .then(places =>{
        //console.log(places);    
        places.forEach(item =>{
            let temp = {
                title: item.title,
                position:{
                    lat:item.position.lat, 
                    lng:item.position.lng
                }
            }           
        placesInfo.push(temp);
        });
        console.log(placesInfo);
    })
}

function getMyPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(myUbication)
    }
    else {
        sectionMap.innerHTML = "Navegador no soporta Geolocalización";
    }
}

function myUbication(response) {
    var miUbicacion = {
        lat: response.coords.latitude,
        lng: response.coords.longitude
    }
    drawMap(miUbicacion);
}

function drawMap(miUbicacion){
    var casaBibi = {
        lat: 49.2751885,
        lng: -123.1159373
    }
    var mapa = new google.maps.Map(document.getElementById("sectionMapa"),{
        center:casaBibi,
        zoom: 12    
    });

    var marker = new google.maps.Marker({
        position: casaBibi,
        map: mapa,
        title: "CASA DE LA BIBI"
    })

    placesInfo.forEach(item =>{
        new google.maps.Marker({
            position: item.position,
            title:  item.title,
            map:mapa
        })
    })

    console.log(miUbicacion);
}