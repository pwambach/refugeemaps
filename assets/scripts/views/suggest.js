import Sidebar from './sidebar';
import getSuggestions from '../libs/get-suggestions.js';
import sendSuggestion from '../libs/send-suggestion.js';

export default class extends Sidebar {
  /**
   * Initialize
   */
  constructor() {
    super('.suggest-hotspot');

    this.$back = this.$container
      .querySelector('.suggest-hotspot__content__header__back');

    this.$list = this.$container.querySelector('.suggest-hotspot-select__body');

    // Assuming we want to ignore any inputs.
    this.$back.addEventListener('click', () => this.hide());
  }

  /**
   * Getting an array of possibly interesting spots around specified location.
   * @param {{lat:number, lng:number}}  userLocation  geo loc tuple
   * @return {locationObject[]}
   */
  getLocationsNearby(position, map) {
    getSuggestions(position, map).then(this.renderPlaces.bind(this));
  }


  renderPlaces(places) {
    this.$list.innerHTML = '';
    let self = this;

    places.forEach((place, index) => {

      if(place.types.indexOf('sublocality') > -1) {
        return;
      }
      if (index > 10) {
        return;
      }

      var $li = document.createElement('li');
      var $input = document.createElement('input');
      var $label = document.createElement('label');
      $label.className = 'select-list__item';
      $label.innerHTML = '<svg class="icon"><use xlink:href="#icon-all" />' +
        '</svg><span class="select-list__item__text select-list__item--with-image">' + place.name + '</span><br />';

      $li.addEventListener('click', function() {
        console.log(place);
        sendSuggestion(place.place_id).then(() => {
          self.toggle();
        });
      }.bind(this), false);

      $li.appendChild($label);
      this.$list.appendChild($li);

    });
  }

  /**
   * Submitting a new suggestion for a hotspot.
   */
  submitNewEntry(hotspotCandidate) {
    // FIXME: waiting on API implementation
  }

  /**
   * One of those Hot
   */
  chooseHotspot(event) {
    // submitNewEntry();
    this.hide();
  }
}
