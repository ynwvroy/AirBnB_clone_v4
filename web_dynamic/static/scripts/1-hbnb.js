$(document).ready(function () {
  // Dictionary or list to store checked amenities
  var checkedAmenities = {};

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
      var amenityId = $(this).data('id');
      var amenityName = $(this).data('name');

      // Check if the checkbox is checked
      if ($(this).is(':checked')) {
          // Store the Amenity ID in the variable
          checkedAmenities[amenityId] = amenityName;
      } else {
          // Remove the Amenity ID from the variable
          delete checkedAmenities[amenityId];
      }

      // Update the h4 tag inside the div Amenities with the list of Amenities checked
      updateSelectedAmenities();
  });

  // Function to update the selected amenities
  function updateSelectedAmenities() {
      var selectedAmenitiesHtml = '';

      // Loop through the checked amenities and build the HTML
      for (var amenityId in checkedAmenities) {
          selectedAmenitiesHtml += '<p>' + checkedAmenities[amenityId] + '</p>';
      }

      // Update the content inside the selected-amenities div
      $('#selected-amenities').html(selectedAmenitiesHtml);
  }
});