import { tracked } from '@glimmer/tracking';
import Route from '@ember/routing/route';
import Experience from 'frontend-toevla-data-entry/models/experience';

/**
 * This model ensures we can have tracking for the complex model
 * object we pass through.
 */
class RouteModel {
  @tracked experience;
  @tracked treeNode;
  @tracked scoring;

  constructor( {experience, treeNode, scoring} ) {
    this.experience = experience;
    this.treeNode = treeNode;
    this.scoring = scoring;
  }
}

export default class ExperienceShowTreeEditRoute extends Route {
  async model( { tree_node_id: treeNodeId } ) {
    const subject = this.modelFor("experience.show");
    const treeNode = await this.store.findRecord('concept', treeNodeId);
    const scoring =
      (await this.store.query('experience-tree-node-score', {
        "filter[subject][:id:]": subject.id,
        "filter[tree-node][:id:]": treeNode.id
      })).firstObject;
    const iconScheme = (await this.store.query('concept-scheme', {
      "filter[:uri:]": "http://data.toevla.org/concept-schemes/summaryIcons",
      "include": "top-level-nodes"}));

    return { subject, treeNode, scoring };
  }

  setupController( controller ) {
    super.setupController( ...arguments );

    controller.reset();
  }
}
