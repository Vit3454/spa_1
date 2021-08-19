import React from 'react'
import osc from '../../../../App.module.css'
import s from './MainPhoto.module.css'
import avatar from '../../../../images/avatar.png'

const MainPhoto = (props) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) props.savePhoto(e.target.files[0])
  }

  return (
    <div className={osc.component + ' ' + s.mainPhoto}>
      <div className={s.ava}>
        {props.userProfile.photos.large ? (
          <img src={props.userProfile.photos.large} alt={'avatar'} />
        ) : (
          <img src={avatar} alt={'avatar'} />
        )}
      </div>
      <div>
        {props.isOwner ? (
          <input type="file" onChange={onMainPhotoSelected} />
        ) : null}
      </div>
    </div>
  )
}

export default MainPhoto
