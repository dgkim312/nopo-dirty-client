import { TopStoreModel } from "./top-store"

test("can be created", () => {
  const instance = TopStoreModel.create({})

  expect(instance).toBeTruthy()
})
