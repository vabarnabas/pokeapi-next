import { BaseResponse } from "./common.types"
import { MoveLearnMethod } from "./move.types"


export interface GameVersion extends BaseResponse {}

export interface VersionDetail {
  rarity: number
  version: GameVersion
}

export interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: MoveLearnMethod
  version_group: GameVersion
}
