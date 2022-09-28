export class PaginatedSearchRequest {
  readonly take: number;
  readonly skip: number;

  constructor(private readonly page: number, private readonly limit: number) {
    this.take = limit;
    this.skip = (page - 1) * limit;
  }
}
