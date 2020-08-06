import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import { editMapping } from 'frontend-toevla-data-entry/utils/custom-component-mapping';

export default class ExperienceShowTreeEditController extends Controller {
  @tracked internalScore = null;
  @tracked showComponent = false;

  get currentScore(){
    return this.model.scoring?.score || this.internalScore;
  }
  set currentScore(score){
    if( this.model.scoring )
      this.model.scoring.score = score;
    else
      this.internalScore = score;
  }

  get extendedEditInfo() {
    return editMapping( this.model.treeNode.uri );
  }

  @action
  async resetComponent() {
    this.showComponent = false;
    setTimeout(
      () => {
        this.showComponent = true;
      },
      50);
  }

  @action submit( event ) {
    event.preventDefault();
    if( this.model.scoring )
      this.model.scoring.save();
    else {
      this.model.scoring = this.store.createRecord('experience-tree-node-score', {
        score: this.internalScore,
        experience: this.model.experience,
        treeNode: this.model.treeNode
      });
      this.model.scoring.save();
    }
  }
}
