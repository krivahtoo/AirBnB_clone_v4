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
});
