export abstract class ValueObject<ComparableField> {
  private readonly __value__: ComparableField;

  protected constructor(comparableField: ComparableField) {
    this.__value__ = comparableField;
  }

  eq(otherVO: ValueObject<ComparableField>) {
    return this.__value__ === otherVO.__value__;
  }
}
