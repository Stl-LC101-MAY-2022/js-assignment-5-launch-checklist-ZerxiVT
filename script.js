window.addEventListener("load", function() {
    document.getElementById('formSubmit').addEventListener('click', function(event){
        event.preventDefault();
        formSubmission(document, 
            document.getElementById('faultyItems'), 
            document.getElementById('pilotName').value, 
            document.getElementsByName('copilotName')[0].value, 
            document.getElementsByName('fuelLevel')[0].value, 
            document.getElementsByName('cargoMass')[0].value);
    }) 
   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
        const planet = pickPlanet(listedPlanets);
        console.log(planet);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
   })
   
});