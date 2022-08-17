import { faker } from '@faker-js/faker';

export abstract class ValueObject<T> {
  public readonly id: string;

  protected constructor() {
    this.id = faker.datatype.uuid();
  }

  eq(otherObject: ValueObject<T>): boolean {
    return this.id === otherObject.id;
  }
}
