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
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
