// Data source
export const DataSourceImpl = Symbol('DATABASE_CONNECTION');

export enum DatabaseMode {
  Dev,
  UnitTest,
  E2ETest,
}
