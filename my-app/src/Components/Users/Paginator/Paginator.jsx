import React from 'react'
import s from './Paginator.module.css'

const Paginator = (props) => {
  const pageCount = Math.ceil(props.totalUsersCount / props.pageSize)

  const pages = []

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  return (
    <div className={s.paginator}>
      {pages.map((p) => (
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
    </div>
  )
}

export default Paginator
