import Route from '@ember/routing/route';

export default class Index extends Route {
  activate(){
    this.transitionTo("poi");
  }
}
