import { BaseResponse } from "./common.types"
import { VersionGroupDetail } from "./version.types"


export interface MoveLearnMethod extends BaseResponse {}

export interface BaseMove extends BaseResponse {}

export interface Move {
  move: BaseMove
  version_group_details: VersionGroupDetail[]
}
