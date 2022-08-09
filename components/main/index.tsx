import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { fetchPokemon } from "../../services/fetchPokemon"
import { PokemonResponse } from "../../types/pokemon.types"
import Spinner from "../spinner"

const MainCanvas = () => {
  const router = useRouter()
  const { type: selectedType } = router.query
  const [pokemonArray, setPokemonArray] = useState<PokemonResponse[]>([])

  useEffect(() => {
    if (selectedType) {
      fetchPokemon(
        Array.isArray(selectedType) ? selectedType[0] : selectedType
      ).then((data) => setPokemonArray(data?.pokemon))
    }
  }, [router.query])

  console.log(pokemonArray)

  return (
    <div className=" px-4 py-4 overflow-y-auto flex items-start h-full w-full">
      {!selectedType ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Spinner />
            <p className="mt-3 font-semibold text-center leading-tight">
              Please select <br /> a type first.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-5 capitalize gap-x-4 gap-y-2">
          {pokemonArray.length !== 0 &&
            pokemonArray.map((pokemon) => (
              <div
                key={pokemon.pokemon.name}
                className="bg-slate-200 hover:bg-blue-100 px-2 py-0.5 rounded-md flex items-center justify-center cursor-pointer"
              >
                {pokemon.pokemon.name}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default MainCanvas
