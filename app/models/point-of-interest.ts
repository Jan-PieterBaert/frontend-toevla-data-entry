import Model, { attr, hasMany } from '@ember-data/model';
import Experience from './experience';

export default class PointOfInterest extends Model {
  @attr('string') label: string | null | undefined;
  @attr('boolean') hasMovableElectronicPaymentSystem: boolean | undefined | null;
  @attr('boolean') wifiAlwaysAvailable: boolean | undefined | null;
  @attr('boolean') assistanceForGuideDogs: boolean | undefined | null;
  @attr('boolean') websiteHasScreenreader: boolean | undefined | null;
  @attr('boolean') websiteSupportsWcag2: boolean | undefined | null;
  @attr('boolean') websiteAllowsTextIncrease: boolean | undefined | null;
  @attr('boolean') publicTransportGuidanceAvailable: boolean | undefined | null;
  @attr('boolean') websiteHasAccessibleContrast: boolean | undefined | null;
  @attr('boolean') websiteHasSignLanguage: boolean | undefined | null;
  @attr('boolean') wheelchairAvailable: boolean | undefined | null;
  @hasMany('experience') experiences!: Experience[];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'point-of-interest': PointOfInterest;
  }
}
