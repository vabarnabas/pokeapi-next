import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { fetchPokemon, fetchPokemonByType } from "../../services/fetchPokemon"
import { getTypeIcon } from "../../services/getTypeIcon"
import { Pokemon, PokemonResponse } from "../../types/pokemon.types"
import ProfileCard from "../profile"
import Spinner from "../spinner"

const MainCanvas = () => {
  const router = useRouter()
  const { type: selectedType, pokemon: selectedPokemon } = router.query
  const [pokemonArray, setPokemonArray] = useState<PokemonResponse[]>([])
  const [extendedPokemonArray, setExtendedPokemonArray] = useState<Pokemon[]>(
    []
  )

  useEffect(() => {
    setExtendedPokemonArray([])
    if (selectedType) {
      fetchPokemonByType(
        Array.isArray(selectedType) ? selectedType[0] : selectedType
      ).then((data) => setPokemonArray(data?.pokemon))

      // fetchPokemon("ditto").then((data) => console.log(data))
    }
  }, [router.query])

  useEffect(() => {
    if (pokemonArray.length !== 0) {
      pokemonArray.forEach((pokemon) => {
        fetchPokemon(pokemon.pokemon.name).then((data) =>
          setExtendedPokemonArray((extendedPokemonArray) => [
            ...extendedPokemonArray,
            data,
          ])
        )
      })
    }
  }, [pokemonArray])

  return (
    <div className="relative px-4 pt-4 overflow-y-auto flex h-full w-full">
      {selectedPokemon && <ProfileCard />}
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
        <div className="w-full h-max grid md:grid-cols-3 lg:grid-cols-5 capitalize gap-x-4 gap-y-2">
          {pokemonArray.length !== 0 &&
          pokemonArray.length === extendedPokemonArray.length ? (
            extendedPokemonArray.map((pokemon) => (
              <div
                onClick={() =>
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, pokemon: pokemon.name },
                  })
                }
                key={pokemon.name}
                className="bg-slate-200 hover:bg-blue-100 px-2 py-1 rounded-md flex items-center justify-start cursor-pointer"
              >
                <div className="flex mr-2">
                  {pokemon.sprites.front_default ? (
                    <div className="relative h-6 w-6">
                      <Image
                        src={pokemon.sprites.front_default || ""}
                        layout="fill"
                      />
                    </div>
                  ) : (
                    <div className="h-4 w-4 mr-2"></div>
                  )}
                </div>
                <div className="flex mr-2 space-x-1">
                  {pokemon.types.map((type) => (
                    <div key={type.type.name} className="relative h-4 w-4">
                      <Image src={getTypeIcon(type.type.name)} layout="fill" />
                    </div>
                  ))}
                </div>
                <p className="">{pokemon.name}</p>
              </div>
            ))
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MainCanvas
