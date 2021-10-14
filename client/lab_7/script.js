async function getRestaurant() {

    //Fetching
    const request = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
    const allRestuarant = await request.json()

    //Getting HTML Elements
    const input = document.querySelector('.input');
    const suggestions = document.querySelector('.suggestions')
    const form = document.querySelector('#form')
    const message = document.createElement('div')
    message.className = 'message'

    //Map Initiation
    const mymap = L.map('mapid').setView([38.9072, -77.0369], 10)
    const layerGroup = L.layerGroup().addTo(mymap)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2hpaGFvczEiLCJhIjoiY2t1bzk4Nno1NGE1ZjMybnpldHhwbXQ4aiJ9.7WC-oMvnZRTHpIS_eeNADQ'
    }).addTo(mymap);

    function addMarker(lat, lon, name) {
        let marker = L.marker([lat, lon]).addTo(layerGroup)
        mymap.flyTo([lat, lon], 12)
        marker.bindPopup(name).openPopup()
    }

    function findMatches(wordToMatch, allRestuarant) {
        return allRestuarant.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi'); 
            return place.zip.match(regex)
        });
    }
       
    function displayMatches(value) {
        const matchArray = findMatches(value, allRestuarant).slice(0,5);
        if (!matchArray.length) { 
            message.innerHTML = "Zip Code Not Found. Try Again!"
            form.appendChild(message)
            mymap.setView([38.9072, -77.0369], 10)
        } 
        const html = matchArray.map(place => {
            return `
                <br>
                <li class="result">
                    <div class="name">${place.name}</div>
                    <div class="type">${place.category}</div>
                    <div class="address">${place.address_line_1} ${place.state}, ${place.zip}</div>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html
        
        const loc = matchArray.map(location => {
            let latitude = location.geocoded_column_1.coordinates[1]
            let longitude = location.geocoded_column_1.coordinates[0]
            let name = location.name
            addMarker(latitude, longitude, name)   
        })
    }

    form.addEventListener('submit', (evt) => {
        displayMatches(input.value)
        evt.preventDefault()
        if (!input.value) {
            suggestions.innerHTML = ""
            layerGroup.clearLayers() 
            mymap.setView([38.9072, -77.0369], 10)
        }    
    });

    input.addEventListener('change', () => {
        layerGroup.clearLayers()
        if (form.contains(message)) {
            form.removeChild(message)  
        }
    });
}

window.onload = getRestaurant()



// matchArray.forEach((item, index) => {
//     const point = item.geocoded_column_1
//     const latLon = point.coordinates
//     const marker = latLon.reverse()
//     const loc = L.marker(marker).addTo(layerGroup)
//     loc.bindPopup(item.name).openPopup()
// })