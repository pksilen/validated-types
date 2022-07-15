export type SemName<N extends string> = N extends `${infer Name}` ? `${Name}` : never;

export default class SemType<Type, Name extends string> {
  private readonly semanticValue: Type;
  protected readonly name: Name;

  constructor(semanticName: SemName<Name>, value: Type);
  constructor(semVar: { [K in SemName<Name>]: Type });
  constructor(semNameOrVar: { [K in SemName<Name>]: Type } | SemName<Name>, value?: Type) {
    if (typeof semNameOrVar === 'object' || value === undefined) {
      this.semanticValue = Object.values(semNameOrVar)[0] as Type;
      this.name = Object.keys(semNameOrVar)[0] as Name;
    } else {
      this.semanticValue = value;
      this.name = semNameOrVar;
    }
  }

  get value(): Type {
    return this.semanticValue;
  }
}
