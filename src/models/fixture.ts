export interface FixtureFactory<T> {
  generate(): T;
}
