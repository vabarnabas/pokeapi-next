import Image from "next/image"
import React, { useEffect, useState } from "react"

const Spinner = () => {
  const typeList = [
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ]
  const [index, setIndex] = useState<number>(0)
  let intervalIndex = index
  let canChange = true

  useEffect(() => {
    const interval = setInterval(() => {
      if (canChange) {
        if (intervalIndex === 17) {
          setIndex(0)
          intervalIndex = 0
        } else {
          setIndex((index) => index + 1)
          intervalIndex++
        }
        canChange = false
      } else {
        canChange = true
      }
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="relative aspect-square w-14 animate-pulseFull">
        <Image src={`/images/types/${typeList[index]}.svg`} layout="fill" />
      </div>
    </div>
  )
}

export default Spinner
