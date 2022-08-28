var map
function initMap(){
    var option ={
        zoom:8,
        center:{lat:42.3601,lng:-71.0598}
    }
    map=new google.maps.Map(document.getElementById('map'),option);
}


initMap()
export default map;