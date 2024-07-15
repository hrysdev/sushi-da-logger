import useFetchScore from "@hooks/useFetchScore"
import { useEffect, useState } from "react"

import type { MaxScoreType } from "./types"

const initMaxRate = {
  cost: 0,
  course: 0,
  date: "0000-00-00",
  miss: 0,
  rate: 0
}

export default function useMaxRate() {
  const [maxRate, setMaxRate] = useState<MaxScoreType>(initMaxRate)
  const [score] = useFetchScore()

  useEffect(() => {
    try {
      setMaxRate(
        Object.values(score).reduce((accumulator, currentValue) => {
          return currentValue.rate > accumulator.rate
            ? currentValue
            : accumulator
        })
      )
    } catch (error) {
      console.error(error)
    }
  }, [score])

  return [maxRate]
}
