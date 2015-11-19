/**
 * The loading indicator
 */
export default class {
  /**
   * Initialize
   */
  constructor() {
    this.$container = document.querySelector('.loading');
  }

  /**
   * Hide the loading indicator
   */
  hide() {
    this.$container.classList.add('overlay--hidden');
  }

  /**
   * Show loading indicator after it was hidden via `hide()`
   */
  show() {
    this.$container.classList.remove('overlay--hidden');
  }
}
