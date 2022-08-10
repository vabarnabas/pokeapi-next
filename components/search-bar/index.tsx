import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { HiSearch, HiX } from "react-icons/hi"

const SearchBar = () => {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { search } = router.query

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: searchQuery },
    })
  }, [searchQuery])

  useEffect(() => {
    if (!search) {
      setIsSearching(false)
    }
  }, [search])

  return (
    <div className="flex h-full items-center justify-end bg-slate-50 pl-4">
      {isSearching ? (
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
            className="bg-transparent pr-2 text-sm outline-none"
            placeholder="Search..."
          />
          <HiX
            onClick={() => setIsSearching(false)}
            className="cursor-pointer text-lg hover:text-rose-400"
          />
        </div>
      ) : (
        <HiSearch
          onClick={() => setIsSearching(true)}
          className="cursor-pointer text-lg hover:text-slate-400"
        />
      )}
    </div>
  )
}

export default SearchBar
