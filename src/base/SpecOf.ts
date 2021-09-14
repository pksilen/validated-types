import VBase from './VBase';
import VInt from '../integer/VInt';
import VFloat from '../float/VFloat';
import VTString from '../string/VTString';

export type SpecOf<ValidatedType extends VBase> = ValidatedType extends VTString<infer Spec>
  ? Spec
  : ValidatedType extends VInt<infer Spec>
  ? Spec
  : ValidatedType extends VFloat<infer Spec>
  ? Spec
  : never;