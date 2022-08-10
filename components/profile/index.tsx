import React, { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useRouter } from "next/router"
import { Pokemon } from "../../types/pokemon.types"
import { fetchPokemon } from "../../services/fetchPokemon"
import Spinner from "../spinner"
import Image from "next/image"
import { getTypeIcon } from "../../services/getTypeIcon"

const ProfileCard = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [pokemonData, setPokemonData] = useState({} as Pokemon)
  const [imageLength, setImageLength] = useState(0)
  const [loadedLength, setLoadedLength] = useState(0)

  const { pokemon: selectedPokemon } = router.query

  console.log({ imageLength, loadedLength })

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
    }
  }, [pokemonData])

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
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                    {pokemonData.name}
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
                      {pokemonData.sprites.front_default && (
                        <div className="relative h-32 w-32">
                          <Image
                            onLoad={() => {
                              console.log(1)
                              setLoadedLength(loadedLength + 1)
                            }}
                            src={pokemonData.sprites.front_default}
                            layout="fill"
                          />
                        </div>
                      )}
                      {pokemonData.sprites.back_default && (
                        <div className="relative h-32 w-32">
                          <Image
                            onLoad={() => {
                              console.log(2)
                              setLoadedLength(loadedLength + 1)
                            }}
                            src={pokemonData.sprites.back_default}
                            layout="fill"
                          />
                        </div>
                      )}
                      {pokemonData.sprites.front_shiny && (
                        <div className="relative h-32 w-32">
                          <Image
                            onLoad={() => {
                              console.log(3)
                              setLoadedLength(loadedLength + 1)
                            }}
                            src={pokemonData.sprites.front_shiny}
                            layout="fill"
                          />
                        </div>
                      )}
                      {pokemonData.sprites.back_shiny && (
                        <div className="relative h-32 w-32">
                          <Image
                            onLoad={() => {
                              console.log(4)
                              setLoadedLength(loadedLength + 1)
                            }}
                            src={pokemonData.sprites.back_shiny}
                            layout="fill"
                          />
                        </div>
                      )}
                      {imageLength !== loadedLength && (
                        <div className="absolute w-64 h-64 flex items-center justify-center bg-white">
                          <Spinner />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        console.log({ imageLength, loadedLength })
                      }}
                      className="w-full border-blue-500 border hover:bg-slate-200 hover:border-blue-600 hover:text-blue-600 text-blue-500 rounded-md py-1 text-sm px-3"
                    >
                      Catch
                    </button>
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
