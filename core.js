if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', function(event) {
  aircraftData.forEach(function(aircraft) {
    document.getElementById('aircraft').innerHTML += '<option value="'+aircraft.id+'">'+aircraft.id+'</option>';
  });   
  
  const searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('aircraft')) {
    document.getElementById('aircraft').value=searchParams.get('aircraft');
    acChange(searchParams.get('aircraft'));
  }
})
var selectedAC = {};
function acChange(selector) {
  selectedAC = aircraftData.find(aircraft => aircraft.id === selector);
  document.getElementById('empty').value = selectedAC.data.Stations.empty.weight;
  document.getElementById('emoment').value = selectedAC.data.Stations.empty.arm;
  document.getElementById('pilmoment').value = selectedAC.data.Stations.pilot.arm;
  document.getElementById('pasmoment').value = selectedAC.data.Stations.copilot.arm;
  document.getElementById('rpasmoment').value = selectedAC.data.Stations.rearPass.arm;
  document.getElementById('bag1moment').value = selectedAC.data.Stations.baggage1.arm;
  if (selectedAC.data.Stations.baggage2.arm > 0 ){
    document.getElementById('bag2moment').value = selectedAC.data.Stations.baggage2.arm;
    document.getElementById('bag2weight').disabled = false;
    document.getElementById('bag2weight').value = '';
  }
  else {
    document.getElementById('bag2weight').disabled = true;
    document.getElementById('bag2weight').value = 0;
    document.getElementById('bag2moment').value = selectedAC.data.Stations.baggage2.arm;
  }
  document.getElementById('fuelmoment').value = selectedAC.data.Stations.fuel.arm;
  document.getElementById('aircraftID').innerHTML = selectedAC.id;
  document.getElementById('ewLink').innerHTML = selectedAC.id + ' Empty Weight';
  document.getElementById('aircraftID').href = selectedAC.data.emptyWeightURL;
  document.getElementById('pohLocation').innerHTML = selectedAC.data.POHLocation;
  document.getElementById('catDisclaim').hidden = false;
  document.getElementById('POHDisclaim').hidden = false;
  
}
