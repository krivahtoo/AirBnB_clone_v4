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

  // Request places and dynamically create HTML content
  function loadPlaces(amenities) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      success: function(data) {
        for (let place of data) {
          let article = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">\$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
          `;
          $('section.places').append(article);
        }
      },
      error: function() {
        console.error('Error fetching places.');
      }
    });
  }
  
  // Initial load of places
  loadPlaces({});

  // Load places based on selected amenities when the button is clicked
  $('button').click(function() {
    loadPlaces(selectedAmenities);
  });
});
