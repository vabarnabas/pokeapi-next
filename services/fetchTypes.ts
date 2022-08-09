export const fetchTypes = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/type`)
  const data = await response.json()

  return data
}
