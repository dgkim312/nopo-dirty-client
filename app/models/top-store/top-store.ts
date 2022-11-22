import {
  flow,
  Instance,
  SnapshotOut,
  SnapshotIn,
  types,
  toGenerator,
  castToSnapshot,
} from "mobx-state-tree"
import { Api } from "../../services/api"

export const TopStoreEntity = types.model("TopStoreEntity").props({
  licenseIssueDate: types.maybe(types.string),
  locationAddress: types.maybe(types.string),
  businessType: types.maybe(types.string),
  storeName: types.maybe(types.string),
  ranking: types.maybe(types.number),
  managementNo: types.maybe(types.string),
})

/**
 * Model description here for TypeScript hints.
 */
export const TopStoreModel = types
  .model("TopStore")
  .props({
    isLoading: true,
    topStores: types.optional(types.array(TopStoreEntity), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    beforeLoading: async () => {
      self.isLoading = true
    },
    saveTopStore: (topStoreSnapshotIn: TopStoreSnapshotIn) => {
      self.topStores.replace(castToSnapshot(topStoreSnapshotIn.topStores))
      self.isLoading = topStoreSnapshotIn.isLoading
    },
  }))
  .actions((self) => ({
    getTopStore: flow(function* () {
      self.saveTopStore({
        topStores: [],
        isLoading: true,
      })

      const result = yield* toGenerator(topStoreApiRequest())
      console.log("Request Finish", result.kind)

      if (result.kind === "ok") {
        self.saveTopStore({
          topStores: result.topStores,
          isLoading: false,
        })
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getTopStoreWithLocal: flow(function* (value) {
      self.saveTopStore({
        topStores: [],
        isLoading: true,
      })

      const result = yield* toGenerator(localStoreApiRequest(value))
      console.log("Request Finish", result.kind)

      if (result.kind === "ok") {
        self.saveTopStore({
          topStores: result.topStores,
          isLoading: false,
        })
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

const topStoreApiRequest = async () => {
  const topStoreApi = new Api()
  topStoreApi.setup()
  return await topStoreApi.getTopStore()
}

const localStoreApiRequest = async (local) => {
  const topStoreApi = new Api()
  topStoreApi.setup()
  return await topStoreApi.getTopStoreWithLocal(local)
}

export interface TopStore extends Instance<typeof TopStoreModel> {}
export interface TopStoreSnapshotOut extends SnapshotOut<typeof TopStoreModel> {}
export interface TopStoreSnapshotIn extends SnapshotIn<typeof TopStoreModel> {}
export const createTopStoreDefaultModel = () => types.optional(TopStoreModel, {})
