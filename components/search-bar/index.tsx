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
          {/* <input type="checkbox" id="caught-only" className="" />
          <label
            htmlFor="caught-only"
            className="flex w-full break-normal text-xs text-slate-600"
          >
            Caught
          </label> */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
            className="bg-transparent pr-2 text-sm outline-none"
            placeholder="Search..."
          />
        </div>
      ) : (
        <HiSearch
          onClick={() => {
            setIsSearching(true)
          }}
          className="cursor-pointer text-lg hover:text-slate-400"
        />
      )}
      <HiX
        onClick={() => {
          const { search, ...queries } = router.query
          setIsSearching(false)
          setSearchQuery("")
          router.push({ pathname: router.pathname, query: { ...queries } })
        }}
        className="ml-2 cursor-pointer text-lg hover:text-rose-400"
      />
    </div>
  )
}

export default SearchBar
