import { Ability } from "./ability.types"
import { BaseResponse } from "./common.types"
import { Form } from "./form.types"
import { GameIndice } from "./indice.types"
import { Item } from "./item.types"
import { Move } from "./move.types"
import { Species } from "./species.types"
import { Sprite } from "./sprites.types"
import { Stat } from "./stat.types"
import { Type } from "./type.types"

export interface BasePokemon extends BaseResponse {}

export interface PokemonResponse {
  pokemon: BasePokemon
  slot: number
}
export interface Pokemon {
  id: number
  is_default: boolean
  name: string
  order: number
  weight: number
  height: number
  base_experience: number
  abilities: Ability[]
  forms: Form[]
  game_indices: GameIndice[]
  held_items: Item[]
  moves: Move[]
  species: Species
  sprites: Sprite
  stats: Stat[]
  types: Type[]
}
