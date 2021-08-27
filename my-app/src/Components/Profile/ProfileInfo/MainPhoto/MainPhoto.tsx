import React, { ChangeEvent } from 'react'
import osc from '../../../../App.module.css'
import s from './MainPhoto.module.css'
import avatar from '../../../../images/avatar.png'
import { UserProfileType } from '../../../../types/types'

type PropsType = {
  userProfile: UserProfileType
  isOwner: Boolean
  savePhoto: (foto: File) => void
}

const MainPhoto: React.FC<PropsType> = ({
  userProfile,
  isOwner,
  savePhoto,
}) => {
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }

  return (
    <div className={osc.component + ' ' + s.mainPhoto}>
      <div className={s.ava}>
        {userProfile.photos.large ? (
          <img src={userProfile.photos.large} alt={'avatar'} />
        ) : (
          <img src={avatar} alt={'avatar'} />
        )}
      </div>
      <div>
        {isOwner ? <input type="file" onChange={onMainPhotoSelected} /> : null}
      </div>
    </div>
  )
}

export default MainPhoto
