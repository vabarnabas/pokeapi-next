import React, { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useRouter } from "next/router"
import { Pokemon } from "../../types/pokemon.types"
import { fetchPokemon } from "../../services/fetchPokemon"
import Spinner from "../spinner"
import Image from "next/image"
import { getTypeIcon } from "../../services/getTypeIcon"
import { usePokemonStorage } from "../../providers/pokemon.storage.provider"
import { TbPokeball } from "react-icons/tb"

const ProfileCard = () => {
  const { pokemonStorage, addPokemon, removePokemon } = usePokemonStorage()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [pokemonData, setPokemonData] = useState({} as Pokemon)
  const [pokemonSprites, setPokemonSprites] = useState<string[]>([])
  const [imageLength, setImageLength] = useState(0)
  const [loadedLength, setLoadedLength] = useState(0)
  const [removeFetching, setRemoveFetching] = useState(false)

  console.log(pokemonStorage)

  const { pokemon: selectedPokemon } = router.query

  useEffect(() => {
    if (selectedPokemon) {
      setPokemonData({} as Pokemon)
      fetchPokemon(
        Array.isArray(selectedPokemon) ? selectedPokemon[0] : selectedPokemon
      ).then((data) => setPokemonData(data))
    }
  }, [selectedPokemon])

  useEffect(() => {
    if (Object.keys(pokemonData).length !== 0) {
      setImageLength(
        [
          pokemonData.sprites.back_default,
          pokemonData.sprites.back_shiny,
          pokemonData.sprites.front_default,
          pokemonData.sprites.front_shiny,
        ].filter((sprite) => sprite !== null).length
      )
      setPokemonSprites(
        [
          pokemonData.sprites.back_default,
          pokemonData.sprites.back_shiny,
          pokemonData.sprites.front_default,
          pokemonData.sprites.front_shiny,
        ].filter((sprite) => sprite !== null)
      )
    }
  }, [pokemonData])

  useEffect(() => {
    const timeOut = window.setTimeout(() => {
      setRemoveFetching(true)
    }, 3000)

    return () => clearTimeout(timeOut)
  }, [])

  const onClose = () => {
    setIsOpen(false)
    router.push(
      {
        pathname: router.pathname,
        query: { type: router.query.type },
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={() => onClose()} className="text-slate-600">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900 bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto select-none">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {Object.keys(pokemonData).length === 0 ? (
                <div className="">
                  <Spinner />
                </div>
              ) : (
                <Dialog.Panel
                  className={`transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${
                    pokemonStorage.includes(pokemonData.name)
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-xl flex capitalize font-medium items-center"
                  >
                    <div className="flex mr-2 space-x-1">
                      {pokemonData.types.map((type) => (
                        <div key={type.type.name} className="relative h-4 w-4">
                          <Image
                            src={getTypeIcon(type.type.name)}
                            layout="fill"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="">{pokemonData.name}</p>
                  </Dialog.Title>
                  <div className="-space-y-0.5 font-light text-slate-400">
                    <p className="text-xs">{`Weight: ${
                      pokemonData.weight / 10
                    }kg`}</p>
                    <p className="text-xs">{`Height: ${
                      pokemonData.height / 10
                    }m`}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="relative grid grid-cols-2 items-center justify-between">
                      {pokemonSprites.map((sprite) => (
                        <div key={sprite} className="relative h-32 w-32">
                          <Image
                            loading="eager"
                            onLoad={() => {
                              setLoadedLength(loadedLength + 1)
                            }}
                            src={sprite}
                            layout="fill"
                          />
                        </div>
                      ))}
                      {imageLength !== loadedLength && !removeFetching && (
                        <div className="absolute w-64 h-64 flex items-center justify-center bg-white">
                          <Spinner />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    {(imageLength === loadedLength || removeFetching) && (
                      <button
                        onClick={() => {
                          pokemonStorage.includes(pokemonData.name)
                            ? removePokemon(pokemonData.name)
                            : addPokemon(pokemonData.name)
                        }}
                        className={`w-full  rounded-md py-1 text-sm px-3 ${
                          pokemonStorage.includes(pokemonData.name)
                            ? "border-rose-500 border hover:bg-slate-200 hover:border-rose-600 hover:text-rose-600 text-rose-500"
                            : "border-blue-500 border hover:bg-slate-200 hover:border-blue-600 hover:text-blue-600 text-blue-500"
                        }`}
                      >
                        {pokemonStorage.includes(pokemonData.name)
                          ? "Release"
                          : "Catch"}
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ProfileCard
