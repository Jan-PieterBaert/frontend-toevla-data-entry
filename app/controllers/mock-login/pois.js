import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { Response } from 'fetch';

const RESULTS_PER_PAGE = 20;

export default class MockLoginPoisController extends Controller {
  queryParams = ['search', 'page'];
  @tracked page = 0;
  @tracked search = "";

  @tracked pois = [];
  @tracked meta = { count: 0 };

  /**
   * Performs a search to the backend when the search string has been
   * changed, has a timeout to prevent everlasting requests.
   */
  @task({ restartable: true })
  * postponedSearch(searchString) {
    yield timeout(500);
    this.page = 0;
    this.search = searchString;
    this.fetchPois.perform();
  }

  @action
  searchEvent(event) {
    event.preventDefault();
    const searchString = event.target.value;
    this.postponedSearch.perform(searchString);
  }

  /**
   * Effectively fetches content from the backend.
   */
  @task({ keepLatest: true })
  * fetchPois() {
    const queryData =
      (yield this
        .store
        .query('point-of-interest', {
          sort: 'label',
          "page[number]": this.page,
          "page[size]": RESULTS_PER_PAGE,
          "filter[label]": isEmpty(this.search) ? undefined : this.search
        }));

    this.meta = queryData.meta;
    this.pois = queryData.toArray();
  }

  /**
   * Renders the page in a human way, starting from 1
   */
  get visiblePage() {
    return this.page + 1;
  }

  get lastPage() {
    return Math.ceil(this.meta.count / RESULTS_PER_PAGE);
  }

  @action
  nextPage() {
    if (this.visiblePage < this.lastPage)
      this.page = this.page + 1;

    this.fetchPois.perform();
  }

  @action
  previousPage() {
    if (this.visiblePage > 1)
      this.page = this.page - 1;

    this.fetchPois.perform();
  }

  @service session;

  @action
  async login( poi ) {
    try {
      await this.session.authenticate('authenticator:mock-login', poi);
      this.errorMessage = "";
    } catch (response ) {
      if (response instanceof Response ) {
        this.errorMessage = `Something went wrong whilst logging in, we received a ${response.status} with info ${response.statusText}`;
      } else {
        this.errorMessage = response.message;
      }
    }
  }
}
