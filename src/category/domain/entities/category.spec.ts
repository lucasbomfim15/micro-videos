import { Category } from "./category";

describe("Category Unit Testes", () => {
    test('Constructor of category', () => {
       const category : Category = new Category('Movie')
       expect(category.name).toBe('Movie')
    })
});