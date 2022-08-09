export const fetchPokemon = async (type: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/type/${type}`
  )
  const data = await response.json()

  return data
}
