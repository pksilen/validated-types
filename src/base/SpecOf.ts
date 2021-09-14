import VBase from './VBase';
import VInt from '../integer/VInt';
import VFloat from '../float/VFloat';
import VString from '../string/VString';

export type SpecOf<ValidatedType extends VBase> = ValidatedType extends VString<infer Spec>
  ? Spec
  : ValidatedType extends VInt<infer Spec>
  ? Spec
  : ValidatedType extends VFloat<infer Spec>
  ? Spec
  : never;
