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
    onSuggestHotspot = () => {}
  }) {
    this.$container = document.querySelector('.actions');
    this.$menuToggle = document.querySelector('.menu-toggle');
    this.$center = this.$container.querySelector('.center');
    this.$filtersToggle = this.$container.querySelector('.filters-toggle');
    this.$suggestHotspot = this.$container.querySelector('.suggest-hotspot-button');

    if (!navigator.geolocation) {
      this.$center.remove();
      this.$suggestHotspot.remove();
    }

    this.onUserLocationSuccess = onUserLocationSuccess;
    this.onUserLocationError = onUserLocationError;
    this.onSuggestHotspot = onSuggestHotspot;

    if (this.$center) {
      this.$center.addEventListener('click', () => this.getUserLocation(this.onUserLocationSuccess));
    }

    if (this.$suggestHotspot) {
      this.$suggestHotspot.addEventListener('click', () => this.getUserLocation(this.onSuggestHotspot));
    }

    this.$filtersToggle.addEventListener('click', () => onFiltersToggle());
    this.$menuToggle.addEventListener('click', () => onMenuToggle());
  }

  /**
   * Get the user location
   */
  getUserLocation(userLocationHandler) {
    navigator.geolocation.getCurrentPosition(position => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      userLocationHandler(userPosition);
    }, () => {
      console.error('There was an error retrieving the geolocation…');
      this.onUserLocationError();
    });
  }

  /**
   * Show the actions
   */
  show() {
    this.$container.classList.remove('actions--hidden');
  }
}
