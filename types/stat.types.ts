import { BaseResponse } from "./common.types"

export interface BaseStat extends BaseResponse {}

export interface Stat {
  base_stat: number
  effort: number
  stat: BaseStat
}
