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

    // Initial update of API status on page load
    updateApiStatus();

    // Set up an interval to periodically update the API status
    setInterval(updateApiStatus, 5000); // Update every 5 seconds (adjust as needed)
});