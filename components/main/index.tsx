import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import Spinner from "../spinner"

const MainCanvas = () => {
  const router = useRouter()
  const { type: selectedType } = router.query

  return (
    <div className="h-full w-full">
      {!selectedType ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Spinner />
          <p className="mt-3 text-center leading-tight">
            Please select a <br /> type first.
          </p>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  )
}

export default MainCanvas
