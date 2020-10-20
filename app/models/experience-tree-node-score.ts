import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import TreeNode from './tree-node';
import Experience from './experience';
import File from './file';

export default class ExperienceTreeNodeScore extends Model {
  @attr('string') score: string | null | undefined;
  @attr('string') comment: string | null | undefined;
  @belongsTo('tree-node') treeNode: TreeNode | null | undefined;
  @belongsTo('experience') experience: Experience | null | undefined;
  @hasMany('file', { inverse: "experienceTreeNodeScore" }) images!: File[];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'experience-tree-node-score': ExperienceTreeNodeScore;
  }
}
