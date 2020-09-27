$(document).ready(() => {
  const dictAmenity = {};
  $('li input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      dictAmenity[$(this).data('id')] = $(this).data('name');
    } else {
      delete dictAmenity[$(this).data('id')];
    }
    const valAmenity = Object.values(dictAmenity);
    $('.amenities h4').text(valAmenity.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status', function (response) {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      }
      else {
        $('#api_status').removeClass('available');
      }
  });
  
 $("button").click(function () {
    $("SECTION.places").empty();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(dictAmenity) }),
      error: function (e) {
        console.log(e);
      },
      success: function (response) {
        for (const place of response) {
          $('SECTION.places').append(
            `<ARTICLE>
            <div class= "title_box">
            <h2> ${place.name} </h2>
            <div class="price_by_night">$ ${place.price_by_night}
            </div>
            </div>
            <div class="information">
            <div class="max_guest"> ${place.max_guest} Guest${(place.max_guest !== 1 ? 's' : '')}
            </div>
            <div class="number_rooms"> ${place.number_rooms} Bedroom${(place.number_rooms !== 1 ? 's' : '')}
            </div>
            <div class="number_bathrooms"> ${place.number_bathrooms} Bathroom${(place.number_bathrooms !== 1 ? 's' : '')}
            </div>
            </div>
            <div class="user">
            <div class="description"> ${place.description} </div>
            </ARTICLE>`
          );
        }
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  })
});