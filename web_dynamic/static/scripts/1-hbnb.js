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
});
