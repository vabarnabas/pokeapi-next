import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { fetchPokemon, fetchPokemonByType } from "../../services/fetchPokemon"
import { getTypeIcon } from "../../services/getTypeIcon"
import { Pokemon, PokemonResponse } from "../../types/pokemon.types"
import ProfileCard from "../profile"
import Spinner from "../spinner"

const MainCanvas = () => {
  const router = useRouter()
  const { pokemonStorage } = usePokemonStorage()
  const { type: selectedType, pokemon: selectedPokemon, search } = router.query
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
  }, [selectedType])

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
    <div className="relative flex h-full w-full overflow-y-auto px-4 pt-4">
      {selectedPokemon && <ProfileCard />}
      {!selectedType ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Spinner />
            <p className="mt-3 text-center font-semibold leading-tight">
              Please select <br /> a type first.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid h-max w-full gap-x-4 gap-y-2 capitalize md:grid-cols-3 lg:grid-cols-5">
          {pokemonArray.length !== 0 &&
          pokemonArray.length === extendedPokemonArray.length ? (
            extendedPokemonArray
              .filter((pokemon) =>
                pokemon.name.includes(
                  Array.isArray(search) ? search[0] : search || ""
                )
              )
              .map((pokemon) => (
                <div
                  onClick={() =>
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, pokemon: pokemon.name },
                    })
                  }
                  key={pokemon.name}
                  className={`flex cursor-pointer items-center justify-start rounded-md bg-slate-200 px-2 py-1 hover:bg-blue-100 ${
                    pokemonStorage.includes(pokemon.name)
                      ? "box-border border border-blue-500"
                      : ""
                  }`}
                >
                  <div className="mr-2 flex">
                    {pokemon.sprites.front_default ? (
                      <div className="relative h-6 w-6">
                        <Image
                          src={pokemon.sprites.front_default || ""}
                          layout="fill"
                        />
                      </div>
                    ) : (
                      <div className="mr-2 h-4 w-4"></div>
                    )}
                  </div>
                  <div className="mr-2 flex space-x-1">
                    {pokemon.types.map((type) => (
                      <div key={type.type.name} className="relative h-4 w-4">
                        <Image
                          src={getTypeIcon(type.type.name)}
                          layout="fill"
                        />
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
