import { flow, Instance, SnapshotIn, SnapshotOut, toGenerator, types } from "mobx-state-tree"
import { Api } from "../../services/api"

export const LandingEntity = types.model("LandingEntity").props({
  image: types.maybe(types.string),
})
/**
 * Model description here for TypeScript hints.
 */
export const LandingModel = types
  .model("Landing")
  .props({
    isLoading: true,
    landing: types.optional(LandingEntity, {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    beforeLoading: async () => {
      self.isLoading = true
    },
    saveLanding: (landingSnapshotOut: LandingSnapshotOut) => {
      self.landing = landingSnapshotOut.landing
      self.isLoading = landingSnapshotOut.isLoading
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getLanding: flow(function* () {
      self.saveLanding({
        landing: { image: "" },
        isLoading: true,
      })

      const result = yield* toGenerator(landingApiRequest())

      if (result.kind === "ok") {
        self.saveLanding({
          landing: { image: result.landing.image },
          isLoading: false,
        })
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

const landingApiRequest = async () => {
  const landingApi = new Api()
  landingApi.setup()
  return await landingApi.getLanding()
}

export interface Landing extends Instance<typeof LandingModel> {}
export interface LandingSnapshotOut extends SnapshotOut<typeof LandingModel> {}
export interface LandingSnapshotIn extends SnapshotIn<typeof LandingModel> {}
export const createLandingDefaultModel = () => types.optional(LandingModel, {})
