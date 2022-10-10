import { LandingModel } from "./landing"

test("can be created", () => {
  const instance = LandingModel.create({})

  expect(instance).toBeTruthy()
})
