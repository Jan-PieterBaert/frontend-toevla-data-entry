import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Experience from './experience';
import Entrance from './entrance';
import Parking from './parking';
import Toilet from './toilet';
import RouteDescription from './route-description';
import TrainStop from './train-stop';
import BusStop from './bus-stop';
import TramStop from './tram-stop';
import File from './file';

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
  @attr('boolean') hasClearlyRecognizableBuilding: boolean | undefined | null;
  @attr('boolean') hasClearlyRecognizableEntrance: boolean | undefined | null;
  @attr('boolean') hasVisibleGuidelines: boolean | undefined | null;
  @attr('boolean') hasMarkingsOrContrastsOnGlassDoors: boolean | undefined | null;
  @attr('boolean') extraAttentionGivenToAcoustics: boolean | undefined | null;
  @attr('boolean') hasAlternativeEntranceForWheelchair: boolean | undefined | null;
  @attr('boolean') hasFreeEntranceForGuide: boolean | undefined | null;
  @attr('boolean') acceptsMuseumPass: boolean | undefined | null;
  @attr('boolean') acceptsUitpas: boolean | undefined | null;
  @attr('boolean') acceptsCityPass: boolean | undefined | null;
  @attr('boolean') acceptsEdc: boolean | undefined | null;
  @hasMany('experience') experiences!: Experience[];
  @hasMany('entrance') entrances!: Entrance[];
  @hasMany('parking') parkings!: Parking[];
  @hasMany('toilet') toilets!: Toilet[];
  @belongsTo('route-description') publicTransportRouteDescription!: RouteDescription | null;
  @hasMany('train-stop') trainStops!: TrainStop[];
  @hasMany('bus-stop') busStops!: BusStop[];
  @hasMany('tram-stop') tramStops!: TramStop[];
  @hasMany('file') files!: File[];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'point-of-interest': PointOfInterest;
  }
}
