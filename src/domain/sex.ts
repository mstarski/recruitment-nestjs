export class Sex {
  private readonly possibleValues = ['male', 'female', 0, 1];
  public readonly value: 'male' | 'female';

  constructor(value: string | number) {
    if (!this.possibleValues.includes(value)) {
      throw new Error('Sex can be either "male" or "female"');
    }

    if (typeof value === 'number') {
      this.value = value === 0 ? 'female' : 'male';
    }
  }

  toBinary(): number {
    return this.value === 'female' ? 0 : 1;
  }

  static getRandom(): Sex {
    return new Sex(Math.random() > 0.5 ? 'male' : 'female');
  }
}
