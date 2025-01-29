import React from 'react'
import SideBar from '../components/SideBar'

export default function DashboardAdminlayouts({children}) {
  return (
  
      <main className="flex min-h-screen bg-gray-200">
        <SideBar />
        <section className="flex-1 bg-gray-100 p-6">{children}</section>
      </main>
  )
}
