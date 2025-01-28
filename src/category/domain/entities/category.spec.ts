import UniqueEntityId from "@seedWork/domain/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import { validate as uuidValidate } from "uuid";

describe("Category Unit Testes", () => {
  test("Constructor of category", () => {
    //Testando categoria criada apenas com o nome!
    let category = new Category({
      name: "Movie",
    });
    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    //testando categoria criada normalmente com o is_active como false.
    category = new Category({
      name: "Movie",
      description: "description",
      is_active: false,
    });
    let created_at = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "description",
      is_active: false,
      created_at,
    });

    //testando categoria passando apenas nome e descrição.
    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    //testando categoria passando apenas nome e is_active como true
    category = new Category({ name: "Movie", is_active: true });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    //testando categoria passando apenas nome e a data
    created_at = new Date();
    category = new Category({ name: "Movie", created_at });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProperties, id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });

   
  });

  test("getter of name props", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getter and setter of description props", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "some description" });
    expect(category.description).toBe("some description");

    category = new Category({ name: "Movie" });
    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("Getter and setter of is_active props", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();
  });

  test("Getter of created_at props", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({ name: "Movie", created_at });
    expect(category.created_at).toBe(created_at);
  });
});
