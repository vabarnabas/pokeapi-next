import { BaseResponse } from "./common.types"

export interface BaseType extends BaseResponse {}

export interface Type {
  slot: number
  type: BaseType
}
