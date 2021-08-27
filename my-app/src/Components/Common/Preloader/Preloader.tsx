import React from 'react'
import preloader from '../../../images/preloader.gif'

type PreloaderPropsType = {}

const Preloader: React.FC<PreloaderPropsType> = (props) => {
  return (
    <div>
      <img src={preloader} alt="Preloader" />
    </div>
  )
}

export default Preloader
