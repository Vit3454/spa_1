import React, { useState } from 'react'
import s from './Paginator.module.css'

type PropsType = {
  totalUsersCount: number
  pageSize: number
  portionSize: number
  currentPage: number
  onPageChaged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  portionSize,
  onPageChaged,
  currentPage,
}) => {
  const pageCount = Math.ceil(totalUsersCount / pageSize)

  const pages = []

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pageCount / portionSize)
  let [currentPortion, setCurrentPortion] = useState(1)
  const leftLimit = (currentPortion - 1) * portionSize - 1
  const rightLimit = currentPortion * portionSize

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
            className={p === currentPage ? s.active : undefined}
            key={p}
            onClick={() => {
              onPageChaged(p)
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
