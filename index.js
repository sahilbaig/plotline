
import calculateDistance from './calculate-distance.js'
import map from './initialize-map.js';

var places=new Array()

// fucntion to place markers and destination and source
const placeMarker=()=>{
    
    for(var i=0;i<places.length-2;i++){
        console.log(places[i])
        places[i].setMap(null)
        
    }

    // removes redundant markers from map
    places[places.length-1].setMap(map)
    places[places.length-2].setMap(map)

    
}



var bounds = new google.maps.LatLngBounds(); // Defines bounds to recenter maps on changing destination

// Drawing path between source and destination
const drawPath = (source,destination)=>{    
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
        {
                origin: source,
                destination: destination,
                travelMode: "DRIVING",
        },
        (response, status) => {
                if (status === "OK") {
    
                    new google.maps.DirectionsRenderer({
                        suppressMarkers: true,
                        directions: response,
                        map: map,
                    });
                }
            }
        )
        bounds.extend(source);
        bounds.extend(destination)
        map.fitBounds(bounds);
    
}




// Initialize map and input fields
function initialize() {
    var input_source = document.getElementById('source');
    var sourceInput = new google.maps.places.Autocomplete(input_source);
        google.maps.event.addListener(sourceInput, 'place_changed', function () {
            var place = sourceInput.getPlace();
            const latitude=place.geometry.location.lat();
            const longitude=place.geometry.location.lng();
            source.lat=latitude
            source.lng=longitude
            //Defining latitude and longitude of source
        //    (new google.maps.LatLng(latitude, longitude))
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: map
            });
    
        places.push(marker)
        });


    var input_destination=document.getElementById('destination')
        // make it destination
    var destinationInput=new google.maps.places.Autocomplete(input_destination)
        google.maps.event.addListener(destinationInput ,'place_changed', function(){
            var place=destinationInput.getPlace()
            const latitude=place.geometry.location.lat();
            const longitude=place.geometry.location.lng();
            // placeMarker(latitude,longitude)
            destination.lat=latitude
            destination.lng=longitude
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: map
               });
      
            places.push(marker)
        })
    }


// Button to calculate distance,place markers and show route
var calculateButton=document.getElementById("calculate-distance-button")
calculateButton.addEventListener("click",()=>{
    
    var origin_input = $('#source').val();
    var destination_input = $('#destination').val();
    if(origin_input && destination_input){
            
        calculateDistance()
        console.log(places)
        placeMarker()
        drawPath(source,destination)


    }
})


google.maps.event.addDomListener(window, 'load', initialize);