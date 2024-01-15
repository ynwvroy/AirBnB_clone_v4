// Wait for DOM to be fully loaded
$(document).ready(function () {
  // Variable to store checked amenities
  var checkedAmenities = {};

  // Function to update the h4 tag inside the div Amenities
  function updateAmenities() {
    var amenitiesList = Object.values(checkedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  }

  // Listen for changes on each input checkbox tag
  $('.amenities ul li input[type="checkbox"]').change(function () {
    var amenityId = $(this).data('id');
    var amenityName = $(this).data('name');

    // If the checkbox is checked, store the Amenity ID
    if ($(this).prop('checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the Amenity ID
      delete checkedAmenities[amenityId];
    }

    // Update the h4 tag with the list of checked Amenities
    updateAmenities();
  });
});
