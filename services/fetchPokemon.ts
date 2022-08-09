export const fetchPokemonByType = async (type: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/type/${type}`
  )
  const data = await response.json()

  return data
}

export const fetchPokemon = async (name: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pokemon/${name}`
  )
  const data = await response.json()

  return data
}
