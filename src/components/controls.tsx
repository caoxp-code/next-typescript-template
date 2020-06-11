// 声明组件和组件树内容
import React, { useState, FC } from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs
const TabControls = (): FC => {
  const [tabIndex, setTabIndex] = useState<string>('1')

  const changeTabIndex = (key: string) => {
    setTabIndex(key)
  }
  return (
    <Tabs defaultActiveKey="1" activeKey={tabIndex} onChange={changeTabIndex}>
      <TabPane tab="控件" key="1"></TabPane>
      <TabPane tab="内容" key="2"></TabPane>
    </Tabs>
  )
}

export default TabControls
