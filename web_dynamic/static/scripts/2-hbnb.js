$(document).ready(function() {
  let selectedAmenities = {};

  $('amenities input[type="checkbox"]').change(function() {
    let amenityId = $(this).data('id');
    let amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    let amenitiesList = Object.values(selectedAmenities).join(', ');
    if (amenitiesList === '') {
      amenitiesList = '&nbsp;';
    }

    $('div.amenities h4').html(amenitiesList);
  });

  // New functionality to check API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
