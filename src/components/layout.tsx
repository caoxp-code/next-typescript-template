import React, { ReactNode } from 'react'
import { Layout } from 'antd'

import ControlsTab from './controls'

const { Sider, Header, Content, Footer } = Layout

const layout: ReactNode = () => {
  return (
    <Layout>
      <Sider>
        <ControlsTab />
      </Sider>
      <Layout>
        <Content></Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  )
}

export default layout
