// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const html = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name} </li>
            <li>Diameter: ${diameter} </li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance} </li>
            <li>Number of Moons: ${moons} </li>
        </ol>
        <img src="${imageUrl}">
    `
    document.getElementById('missionTarget').innerHTML = html;
}

function validateInput(testInput) {
    if (testInput.trim() === '') {
        return "Empty";
    }
    else if (isNaN(testInput)) {
        return "Not a Number";
    }
    else if (!isNaN(testInput)) {
        return "Is a Number";
    }

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let readyForLaunch = true;
    if (validateInput(pilot) === 'Not a Number') {
        document.getElementById('pilotStatus').innerHTML = `Pilot ${pilot} is ready for launch`;
    }
    else {
        alert('Invalid input for pilot field');
        return;
    }

    if (validateInput(copilot) === 'Not a Number') {
        document.getElementById('copilotStatus').innerHTML = `Copilot ${copilot} is ready for launch`;
    }
    else {
        alert('Invalid input for copilot field');
        return;
    }

    if (validateInput(fuelLevel) === 'Is a Number') {
        if (parseFloat(fuelLevel) < 10000) {
            document.getElementById('fuelStatus').innerHTML = 'Fuel level is too low for launch';
            readyForLaunch = false;
        }
        else {
            document.getElementById('fuelStatus').innerHTML = 'Fuel level is high enough for launch';
        }
    }
    else {
        alert('Invalid input for fuel level field');
        return;
    }

    if (validateInput(cargoLevel) === 'Is a Number') {
        if (parseFloat(cargoLevel) > 10000) {
            document.getElementById('cargoStatus').innerHTML = 'Cargo mass is too high for launch';
            readyForLaunch = false;
        }
        else {
            document.getElementById('cargoStatus').innerHTML = 'Cargo level is low enough for launch';
        }
    }
    else {
        alert('Invalid input for cargo level field');
        return;
    }

    if (readyForLaunch) {
        document.getElementById('launchStatus').innerHTML = 'Shuttle is ready for launch';
        document.getElementById('launchStatus').style.color = 'green';
    }
    else {
        document.getElementById('launchStatus').innerHTML = 'Shuttle not ready for launch';
        document.getElementById('launchStatus').style.color = 'red';
    }
    list.style.visibility = 'visible';
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();    
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    const index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
