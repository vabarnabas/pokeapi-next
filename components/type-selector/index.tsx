import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { fetchTypes } from "../../services/fetchTypes"
import { BaseType } from "../../types/type.types"

const TypeSelector = () => {
  const router = useRouter()
  const [types, setTypes] = useState<BaseType[]>([])

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data.results))
  }, [])

  const onTypeSelected = (type: string) => {
    router.push({ pathname: router.pathname, query: { type } })
  }

  return (
    <div className="w-full border-b border-slate-200 py-2 px-4">
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {types.slice(0, 18).map((type) => (
          <div
            key={type.name}
            onClick={(e) => {
              e.preventDefault()
              onTypeSelected(type.name)
            }}
            className="bg-slate-200 hover:bg-blue-100 px-2 py-0.5 rounded-md flex items-center justify-center cursor-pointer"
          >
            <div className="relative h-4 w-4">
              <Image
                src={`/images/types/${type.name.toUpperCase()}.svg`}
                layout="fill"
              />
            </div>
            <p className="ml-1.5 capitalize text-sm text-slate-600">
              {type.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TypeSelector
