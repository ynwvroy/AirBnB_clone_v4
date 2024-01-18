$(document).ready(function () {
    // Function to update API status
    function updateApiStatus() {
        // Make a GET request to the API status endpoint
        $.ajax({
            type: 'GET',
            url: 'http://0.0.0.0:5001/api/v1/status/',
            success: function (data) {
                // Check if the status is "OK"
                if (data.status === 'OK') {
                    // If "OK", add the class "available" to the div#api_status
                    $('#api_status').addClass('available');
                } else {
                    // If not "OK", remove the class "available" from the div#api_status
                    $('#api_status').removeClass('available');
                }
            },
            error: function () {
                // Handle errors if the request fails
                console.log('Error fetching API status');
            }
        });
    }

    // Function to load places from the front-end
    function loadPlaces() {
        // Make a POST request to the places_search endpoint
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: '{}',
            success: function (data) {
                // Loop through the result and create article tags representing Places
                for (var i = 0; i < data.length; i++) {
                    var place = data[i];
                    var articleHtml = '<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                        '</div>' +
                        '<div class="information">' +
                        '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                        '</div>' +
                        '<div class="description">' + place.description + '</div>' +
                        '</article>';

                    // Append the article to the places section
                    $('.places').append(articleHtml);
                }
            },
            error: function () {
                // Handle errors if the request fails
                console.log('Error fetching places');
            }
        });
    }

    // Initial update of API status on page load
    updateApiStatus();

    // Set up an interval to periodically update the API status
    setInterval(updateApiStatus, 5000); // Update every 5 seconds (adjust as needed)

    // Load places from the front-end on page load
    loadPlaces();
});
