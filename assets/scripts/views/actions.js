/**
 * The floating actions
 */
export default class {
  /**
   * Initialize
   */
  constructor({
    onMenuToggle = () => {},
    onFiltersToggle = () => {},
    onUserLocationSuccess = () => {},
    onUserLocationError = () => {},
    onSuggestHotspot = () => {},
    onSuggestedLocationSuccess = () => {},
    onSuggestedLocationError = () => {},
  }) {
    this.$container = document.querySelector('.actions');
    this.$menuToggle = document.querySelector('.menu-toggle');
    this.$center = this.$container.querySelector('.center');
    this.$filtersToggle = this.$container.querySelector('.filters-toggle');
    this.$suggestHotspot = this.$container
      .querySelector('.suggest-hotspot-button');

    if (!navigator.geolocation) {
      this.$center.remove();
      this.$suggestHotspot.remove();
    }

    this.onUserLocationSuccess = onUserLocationSuccess;
    this.onUserLocationError = onUserLocationError;
    this.onSuggestHotspot = onSuggestHotspot;
    this.onSuggestedLocationSuccess = onSuggestedLocationSuccess;

    if (this.$center) {
      this.$center.addEventListener('click', () => this.getUserLocation(
          this.onUserLocationSuccess,
          this.onUserLocationError));
    }

    if (this.$suggestHotspot) {
      this.$suggestHotspot.addEventListener('click', () =>
        this.suggestNewHotspot());
    }

    this.$filtersToggle.addEventListener('click', () => onFiltersToggle());
    this.$menuToggle.addEventListener('click', () => onMenuToggle());
  }

  /**
   * Get the user location, where
   * @param {function} successHandler cb with userPosition{lat,lng} as argument
   * @param {function} errorHandler   cb no args, called when no loc determined
   */
  getUserLocation(successHandler, errorHandler) {
    navigator.geolocation.getCurrentPosition(position => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      successHandler(userPosition);
    }, () => {
      console.error('There was an error retrieving the geolocation…');
      errorHandler();
    });
  }

  /**
   * Suggest new Hotspot (at current location, using client info).
   * @todo Not flexible enough i.e. if you want to tap to choose a spot.
   */
  suggestNewHotspot() {
    this.onSuggestHotspot();
    this.getUserLocation(
      this.onSuggestedLocationSuccess,
      this.onSuggestedLocationError);
  }

  /**
   * Show the actions
   */
  show() {
    this.$container.classList.remove('actions--hidden');
  }
}
