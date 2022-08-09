import { BaseResponse } from "./common.types"
import { VersionDetail } from "./version.types"

export interface BaseItem extends BaseResponse {}

export interface Item {
  item: BaseItem
  version_details: VersionDetail[]
}