import "../styles/globals.css"
import type { AppProps } from "next/app"
import { PokemonStorageProvider } from "../providers/pokemon.storage.provider"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PokemonStorageProvider>
      <Component {...pageProps} />
    </PokemonStorageProvider>
  )
}

export default MyApp
