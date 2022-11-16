import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetUserResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class UserApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getUser(id: string): Promise<GetUserResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`/users/${id}`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const user = response.data.data

      return { kind: "ok", user }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
