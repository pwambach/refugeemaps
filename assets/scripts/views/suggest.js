import Sidebar from './sidebar';


export default class extends Sidebar {
  /**
   * Initialize
   */
  constructor() {
    super('.suggest-hotspot');

    this.$back = this.$container
      .querySelector('.suggest-hotspot__content__header__back');

    // Assuming we want to ignore any inputs.
    this.$back.addEventListener('click', () => this.hide());
  }

  /**
   * Getting an array of possibly interesting spots around specified location.
   * @param {{lat:number, lng:number}}  userLocation  geo loc tuple
   * @return {locationObject[]}
   */
  getLocationsNearby(userLocation) {
    // FIXME: waiting on API implementation
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
