import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LayoutContainerComponent extends Component {
  @tracked sideNavOpen = false;

  @action toggleSideNavOpen() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  @action hideSideNav() {
    this.sideNavOpen = false;
  }
}
