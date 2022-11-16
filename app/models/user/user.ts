import { flow, Instance, SnapshotIn, SnapshotOut, toGenerator, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { withEnvironment } from "../extensions/with-environment"

export const UserEntity = types.model("UserEntity").props({
  name: types.maybe(types.string),
  gender: types.maybe(types.string),
  age: types.maybe(types.string),
})

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    isLoading: true,
    user: types.optional(UserEntity, {}),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    beforeLoading: async () => {
      self.isLoading = true
    },
    saveUser: (userSnapshotOut: UserSnapshotOut) => {
      self.user = userSnapshotOut.user
      self.isLoading = userSnapshotOut.isLoading
    },
  }))
  .actions((self) => ({
    getUser: flow(function* (id: string) {
      self.saveUser({
        user: { name: "", gender: "", age: "" },
        isLoading: true,
      })

      const result = yield* toGenerator(userApiRequest(id))

      if (result.kind === "ok") {
        self.saveUser({
          user: { name: result.user.name, gender: result.user.gender, age: result.user.age },
          isLoading: false,
        })
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

const userApiRequest = async (id: string) => {
  const userApi = new Api()
  userApi.setup()
  return await userApi.getUser(id)
}

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
