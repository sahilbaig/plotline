
const showDistance = (distance,time)=>{
  var distancediv=document.getElementById('distance-description')
  if(distance==false && time==false){
    distancediv.innerHTML="No roadways found"
  }
  else{
    distancediv.innerHTML=`${time}(${distance})`
  }
  
  
}

function calculateDistance() {
  var origin = $('#source').val();
  var destination = $('#destination').val();
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
      {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
      }, callback);
}

// get distance results
function callback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
      showDistance(false,false)
  } else {
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        showDistance(false,false)
        } 
      else if(response.rows[0].elements[0].status === "NOT_FOUND"){
        alert("Please choose valid points")
      }
        else {
          var distance = response.rows[0].elements[0].distance.text;
          var duration = response.rows[0].elements[0].duration;
          var duration_text = duration.text;
          showDistance(distance,duration_text)
      }
  }
}

export default calculateDistance