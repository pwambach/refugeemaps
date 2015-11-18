import Sidebar from './sidebar';


export default class extends Sidebar {
  /**
   * Initialize
   */
  constructor() {
    super('.suggest-hotspot');

    this.$back = this.$container
      .querySelector('.suggest-hotspot__content__header__back');

    this.$back.addEventListener('click', () => this.hide());

    //this.onSuggestSelect =
  }

  chooseHotspot(event) {
    this.hide();
  }
}
