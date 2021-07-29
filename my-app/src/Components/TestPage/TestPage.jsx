import React from 'react'
import s from './TestPage.module.css'
import os from '../../App.module.css'

const TestPage = () => {
  return <div className={s.testPage + ' ' + os.block}>Test page.</div>
}

export default TestPage
