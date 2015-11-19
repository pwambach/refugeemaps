import Promise from 'lie';

export default function(position, map) {
  let request = {
    location: new google.maps.LatLng(position.lat, position.lng),
    radius: '100'
  };

  return new Promise(resolve => {
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      console.log(results, status);
      resolve(results);
    });
  });
}
