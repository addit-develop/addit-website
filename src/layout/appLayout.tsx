import React from 'react'
import Header from '@/components/header/header'

type AppLayoutProps = {
  children: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  )
}

export default AppLayout
