import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PoiShow extends Route {
  @service store!: Store;

  model({ id }: { id: string }) {
    return this.store.findRecord('point-of-interest', id);
  }
}
