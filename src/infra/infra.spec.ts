import { PaginatedList } from './infra.types';

describe('Infra', () => {
  describe('Paginated Model', () => {
    // ✅
    it(`should have 'page' property specified that points at the current page of the response`, () => {
      const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const total = 10;
      const page = 1;

      const list = new PaginatedList(total, mockData, page);

      expect(list.page).toBe(page);
    });
  });
});
