import Promise from 'lie';
import reqwest from 'reqwest';

/**
 * Returns a promise which resolves the hotspots data
 * @return {Promise} The promise.
 */
export default function(id) {
  const url = 'https://script.google.com/macros/s/AKfycbx73uFKQxwv-4_ncICUv3zdMOAZqV4XHveX4-jPiK5e/dev' + '?id=' + id + '&comment=' + encodeURIComponent('This is a very nice place to hang out') + '&x=' + Date.now();

  var img = document.createElement('img');
  img.setAttribute('src', url);
  document.body.appendChild(img);



  return new Promise((resolve, reject) => {
    resolve();
    // reqwest({
    //   url: url,
    //   method: 'GET',
    //   success: resolve,
    //   error: reject
    // });
  });
}
