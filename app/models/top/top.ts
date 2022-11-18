import { Instance, types } from "mobx-state-tree"

/**
 * Rick and Morty character model.
 */
export const TopModel = types.model("Top").props({
  managementNo: types.maybe(types.string),
  licenseIssueDate: types.maybe(types.string),
  locationAddress: types.maybe(types.string),
  businessType: types.maybe(types.string),
  storeName: types.maybe(types.string),
  ranking: types.maybe(types.number),
})

export interface Top extends Instance<typeof TopModel> {}
