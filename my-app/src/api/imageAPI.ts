import { PhotosType } from '../types/types'
import { instance, APIResponseType } from './api'

type SavePhotoResponseDataType = {
  photos: PhotosType
}

export const imageAPI = {
  savePhoto: (fotoFile: any) => {
    const formData = new FormData()
    formData.append('image', fotoFile)

    return instance
      .put<APIResponseType<SavePhotoResponseDataType>>(
        'profile/photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => res.data)
  },
}
