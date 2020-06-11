// 自定义app页面，默认规范，不能修改文件名称

import React, { ReactNode } from 'react'
import { AppProps } from 'next/app'

const MyApp: ReactNode = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
