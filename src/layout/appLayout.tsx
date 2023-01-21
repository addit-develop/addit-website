import React from 'react'
import Header from '@/components/header/header'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  )
}

export default AppLayout
