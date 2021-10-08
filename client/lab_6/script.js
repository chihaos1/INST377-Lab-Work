async function getRestaurant() {

    const request = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
    const allRestuarant = await request.json()
    const input = document.querySelector('.restaurant');
    const suggestions = document.querySelector('.suggestions')
    console.log(allRestuarant)

    function findMatches(wordToMatch, allRestuarant) {
     return allRestuarant.filter(place => {
         const regex = new RegExp(wordToMatch, 'gi'); //g stands for global, i stands for insensitive
         return place.name.match(regex) || place.zip.match(regex) || place.category.match(regex)
        });
    }

    function displayMatches(e) {
        const matchArray = findMatches(e.target.value, allRestuarant);
        const html = matchArray.map(place => { //map turn into array
            return `
                <li>
                    <div class="name">${place.name}</div>
                    <div class="type">${place.category}</div>
                    <div class="address">${place.address_line_1}</div>
                    <div class="state-zip">${place.state}, ${place.zip}</div>
                </li><br>
            `;
        }).join('');
        suggestions.innerHTML = html
    }

    input.addEventListener('change', displayMatches);
    input.addEventListener('keyup', (evt) => {displayMatches(evt)});
}

window.onload = getRestaurant()