import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { fetchTypes } from "../../services/fetchTypes"
import { getTypeIcon } from "../../services/getTypeIcon"
import { BaseType } from "../../types/type.types"
import SearchBar from "../search-bar"

const TypeSelector = () => {
  const router = useRouter()
  const [types, setTypes] = useState<BaseType[]>([])
  const { type: selectedType } = router.query

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data.results))
  }, [])

  const onTypeSelected = (type: string) => {
    router.push({ pathname: router.pathname, query: { type } })
  }

  return (
    <div className="relative flex w-full items-center justify-between border-b border-slate-200 py-2 px-4">
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {types.slice(0, 18).map((type) => (
          <div
            key={type.name}
            onClick={(e) => {
              e.preventDefault()
              onTypeSelected(type.name)
            }}
            className={`box-border flex cursor-pointer items-center justify-center rounded-md bg-slate-200 px-2 py-0.5 ${
              (Array.isArray(selectedType) ? selectedType[0] : selectedType) ===
              type.name
                ? "border border-blue-500 text-blue-500"
                : "text-slate-600 hover:bg-blue-100"
            }`}
          >
            <div className="relative h-4 w-4">
              <Image src={getTypeIcon(type.name)} layout="fill" />
            </div>
            <p className="ml-1.5 text-sm capitalize ">{type.name}</p>
          </div>
        ))}
      </div>
      <SearchBar />
    </div>
  )
}

export default TypeSelector
