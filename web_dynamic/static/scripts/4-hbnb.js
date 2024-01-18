$(document).ready(function () {
    // Function to update API status
    const updateApiStatus = () => {
        $.ajax({
            type: 'GET',
            url: 'http://0.0.0.0:5001/api/v1/status/',
            success: (data) => {
                const isApiAvailable = data.status === 'OK';
                $('#api_status').toggleClass('available', isApiAvailable);
            },
            error: () => {
                console.log('Error fetching API status');
            }
        });
    };

    // Function to load places from the front-end
    const loadPlaces = () => {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({}), // Sending an empty JSON object in the request body
            success: (places) => {
                renderPlaces(places);
            },
            error: () => {
                console.log('Error fetching places');
            }
        });
    };

    // Function to render places on the front-end
    const renderPlaces = (places) => {
        const placesSection = $('.places');
        placesSection.empty(); // Clear existing content before rendering new places

        places.forEach(place => {
            const { name, price_by_night, max_guest, number_rooms, number_bathrooms, description } = place;

            const articleHtml = `
                <article>
                    <div class="title_box">
                        <h2>${name}</h2>
                        <div class="price_by_night">$${price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${max_guest} Guest${max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${number_rooms} Bedroom${number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${number_bathrooms} Bathroom${number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">${description}</div>
                </article>
            `;

            placesSection.append(articleHtml);
        });
    };

    // Function to handle the search button click
    const handleSearchButtonClick = () => {
        // Get the list of checked amenities
        const checkedAmenities = $('.amenities input:checked').map(function() {
            return $(this).data('id');
        }).get();

        // Make a POST request to places_search with the list of checked amenities
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify
