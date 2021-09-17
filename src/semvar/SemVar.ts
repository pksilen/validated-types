export type SemName<N extends string> = N extends `${infer Name}` ? `${Name}` : never;

export default class SemVar<T, N extends string> {
  private readonly semanticValue: T;

  constructor(semanticName: SemName<N>, value: T) {
    this.semanticValue = value;
  }

  get value(): T {
    return this.semanticValue;
  }
}
