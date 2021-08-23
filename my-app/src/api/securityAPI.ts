import { instance } from './api'

type GetCaptchaUrlResponseDataType = {
  url: string
}

export const securityAPI = {
  getCaptcha: () => {
    return instance
      .get<GetCaptchaUrlResponseDataType>('security/get-captcha-url')
      .then((res) => {
        return res.data.url
      })
  },
}
