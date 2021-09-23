export type SemName<N extends string> = N extends `${infer Name}` ? `${Name}` : never;

export default class SemVar<T, N extends string> {
  private readonly semanticValue: T;

  constructor(semanticName: SemName<N>, value: T);
  constructor(semVar: { [K in SemName<N>]: T });
  constructor(semNameOrVar: { [K in SemName<N>]: T } | SemName<N>, value?: T) {
    if (typeof semNameOrVar === 'object' || value === undefined) {
      this.semanticValue = Object.values(semNameOrVar)[0] as T;
    } else {
      this.semanticValue = value;
    }
  }

  get value(): T {
    return this.semanticValue;
  }
}
