import { get } from '@ember/object';
import { set } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import { editMapping } from 'frontend-toevla-data-entry/utils/custom-component-mapping';
import { yes, no, info } from 'frontend-toevla-data-entry/utils/uris/criterion-codelist';

export default class ExperienceShowTreeEditController extends Controller {
  @tracked showComponent = false;

  @action
  reset() {
    this.didSetScore = false;
    this.didSetComment = false;
    this.didSetCommentLinkText = false;
    this.didSetCommentLinkUrl = false;
  }

  // -- SCORING --
  @tracked enteredScore = null;
  @tracked didSetScore = false;

  get currentScore() {
    if( this.didSetScore )
      return this.enteredScore;
    else
      return this.model.scoring?.score;
  }
  set currentScore(score) {
    this.didSetScore = true;
    this.enteredScore = score;
  }

  get extendedEditInfo() {
    return editMapping( this.model.treeNode.uri );
  }

  get scoreOptions() {
    return [
      { value: yes, label: "Ja" },
      { value: no, label: "Nee" },
      { value: info, label: "Info" },
      { value: null, label: "Geen selectie" }
    ];
  }

  @action
  selectScore( score ) {
    this.currentScore = score;
  }

  // -- COMMENT TEXT --
  @tracked enteredComment = null;
  @tracked didSetComment = false;

  get currentComment(){
    if( this.didSetComment ) {
      return this.enteredComment;
    } else {
      return this.model.scoring?.comment;
    }
  }
  set currentComment(comment) {
    comment = comment == "" ? null : comment;
    this.didSetComment = true;
    this.enteredComment = comment;
  }

  // -- COMMENT LINK TEXT --
  @tracked enteredCommentLinkText = null;
  @tracked didSetCommentLinkText = false;

  get currentCommentLinkText(){
    if( this.didSetCommentLinkText ) {
      return this.enteredCommentLinkText;
    } else {
      return this.model.scoring?.commentLinkText;
    }
  }
  set currentCommentLinkText(comment) {
    comment = comment == "" ? null : comment;
    this.didSetCommentLinkText = true;
    this.enteredCommentLinkText = comment;
  }

  // -- COMMENT LINK URL --
  @tracked enteredCommentLinkUrl = null;
  @tracked didSetCommentLinkUrl = false;

  get currentCommentLinkUrl(){
    if( this.didSetCommentLinkUrl ) {
      return this.enteredCommentLinkUrl;
    } else {
      return this.model.scoring?.commentLinkUrl;
    }
  }
  set currentCommentLinkUrl(comment) {
    comment = comment == "" ? null : comment;
    this.didSetCommentLinkUrl = true;
    this.enteredCommentLinkUrl = comment;
  }

  // -- FILES --
  @action
  async uploaded( file ) {
    this.ensureScoringModel();
    await this.model.scoring.save();
    this.model.scoring.images.pushObject(file);
    this.model.scoring.save();
    const poi = await this.model.subject.pointOfInterest;
    get( poi, "images" ).pushObject(file);
    poi.save();
  }

  @action
  removeFile(image) {
    console.error(`removefile is not implemented yet in /app/controllers/experience/show/tree/edit.js`);
  }

  // -- SAVING --
  @action
  submit( event ) {
    event.preventDefault();
    this.ensureScoringModel();

    if( this.didSetScore )
      this.model.scoring.score = this.enteredScore;
    if( this.didSetComment )
      this.model.scoring.comment = this.enteredComment;
    if( this.didSetCommentLinkText )
      this.model.scoring.commentLinkText = this.enteredCommentLinkText;
    if( this.didSetCommentLinkUrl )
      this.model.scoring.commentLinkUrl = this.enteredCommentLinkUrl;

    this.model.scoring.save();
  }

  ensureScoringModel() {
    if( ! this.model.scoring )
      set( this.model, "scoring",
           this.store.createRecord('experience-tree-node-score', {
             score: this.enteredScore,
             comment: this.enteredComment,
             commentLinkText: this.enteredCommentLinkText,
             commentLinkUrl: this.enteredCommentLinkUrl,
             subject: this.model.subject,
             treeNode: this.model.treeNode
           }));
  }
}
