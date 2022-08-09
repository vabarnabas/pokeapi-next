import Image from "next/image"
import React, { useEffect, useState } from "react"
import { getTypeIcon } from "../../services/getTypeIcon"

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
  const [index, setIndex] = useState<number>(Math.floor(Math.random() * 16))
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
      <div className="relative aspect-square w-12 animate-pulseFull">
        <Image src={getTypeIcon(typeList[index])} layout="fill" />
      </div>
    </div>
  )
}

export default Spinner
