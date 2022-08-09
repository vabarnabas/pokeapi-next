export interface BaseAbility {
  name: string
  url: string
}

export interface Ability {
  ability: BaseAbility
  isHidden: boolean
  slot: number
}
