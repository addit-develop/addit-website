import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/Footer'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default AppLayout
