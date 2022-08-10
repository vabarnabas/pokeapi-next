import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react"

type Action =
  | { type: "add_pokemon"; name: string }
  | { type: "remove_pokemon"; name: string }
  | { type: "set_storage"; storage: string[] }
  | { type: "clear_storage" }

interface Context {
  pokemonStorage: string[]
  addPokemon: (name: string) => void
  removePokemon: (name: string) => void
  clearStorage: () => void
}

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "add_pokemon":
      return [...state, action.name]
    case "remove_pokemon":
      return state.filter((pokemon: string) => pokemon !== action.name)
    case "set_storage":
      return action.storage
    case "clear_storage":
      return []
    default:
      return state
  }
}

const PokemonStorageContext = createContext<Context>({} as any)

interface Props {
  children: React.ReactNode
}

export const PokemonStorageProvider: React.FC<Props> = ({ children }) => {
  const [fetching, setFetching] = useState(true)
  const [state, dispatch] = useReducer(reducer, [])

  const actions = useMemo(
    () => ({
      addPokemon: (name: string) => {
        dispatch({ type: "add_pokemon", name })
      },
      removePokemon: (name: string) => {
        dispatch({ type: "remove_pokemon", name })
      },
      setStorage: (storage: string[]) => {
        dispatch({
          type: "set_storage",
          storage,
        })
      },
      clearStorage: () => {
        dispatch({ type: "clear_storage" })
      },
    }),
    []
  )

  useEffect(() => {
    actions.setStorage(
      JSON.parse(localStorage.getItem("caughtPokemonStorage") || "[]")
    )
    setFetching(false)
  }, [])

  useEffect(() => {
    if (!fetching) {
      localStorage.setItem("caughtPokemonStorage", JSON.stringify(state))
    }
  }, [state])

  return (
    <PokemonStorageContext.Provider
      value={{ pokemonStorage: state, ...actions }}
    >
      {children}
    </PokemonStorageContext.Provider>
  )
}

export const usePokemonStorage = () => useContext(PokemonStorageContext)
