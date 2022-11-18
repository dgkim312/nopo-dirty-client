import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Top } from "../../models/top/top"

export interface User {
  name: string
  age: string
  gender: string
  email: string
}

export interface Landing {
  image: string
}

export type GetTopStoresResult = { kind: "ok"; topStores: Top[] } | GeneralApiProblem
export type GetTopStoreResult = { kind: "ok"; topStores: Top } | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetLandingResult = { kind: "ok"; landing: Landing } | GeneralApiProblem
