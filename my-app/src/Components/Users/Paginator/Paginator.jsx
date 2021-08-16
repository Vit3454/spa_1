import React, { useState } from "react"
import s from "./Paginator.module.css"

const Paginator = (props) => {
  const pageCount = Math.ceil(props.totalUsersCount / props.pageSize)

  const pages = []

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pageCount / props.portionSize)
  let [currentPortion, setCurrentPortion] = useState(1)
  const leftLimit = (currentPortion - 1) * props.portionSize - 1
  const rightLimit = currentPortion * props.portionSize

  return (
    <div className={s.paginator}>
      {currentPortion > 1 ? (
        <button
          onClick={() => {
            setCurrentPortion(currentPortion - 1)
          }}
        >
          prev
        </button>
      ) : null}
      {pages
        .filter((p) => p >= leftLimit && p <= rightLimit)
        .map((p) => (
          <button
            className={p === props.currentPage ? s.active : undefined}
            key={p}
            onClick={() => {
              props.onPageChaged(p)
            }}
          >
            {p}
          </button>
        ))}
      {currentPortion < portionCount ? (
        <button
          onClick={() => {
            setCurrentPortion(currentPortion + 1)
          }}
        >
          next
        </button>
      ) : null}
    </div>
  )
}

export default Paginator
