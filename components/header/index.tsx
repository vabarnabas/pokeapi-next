import { useRouter } from "next/router"
import React from "react"

const Header = () => {
  const router = useRouter()

  return (
    <div className="w-full py-2 px-4 border-b border-slate-200">
      <div
        onClick={() => {
          router.push({ query: {} })
        }}
        className="font-semibold cursor-pointer"
      >
        poke<span className="text-blue-500">API</span>
      </div>
    </div>
  )
}

export default Header
