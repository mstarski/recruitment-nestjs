type SexType = 'male' | 'female';

export class Sex {
  public readonly value: SexType;

  constructor(value: string | number) {
    const possibleValues = ['male', 'female', 0, 1];
    let translatedValue: SexType;

    if (!possibleValues.includes(value)) {
      throw new Error('Sex can be either "male" or "female"');
    }

    if (typeof value === 'number') {
      translatedValue = value === 0 ? 'female' : 'male';
    } else {
      translatedValue = value as SexType;
    }

    this.value = translatedValue;
  }

  toBinary(): number {
    return this.value === 'female' ? 0 : 1;
  }

  static getRandom(): Sex {
    return new Sex(Math.random() > 0.5 ? 'male' : 'female');
  }
}
