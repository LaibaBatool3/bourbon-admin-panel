import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <Header />
      <div className="flex min-h-0 flex-1 gap-4 pl-[32px] pr-[32px] pt-[24px] pb-[32px]">
        <Sidebar />
        <main className="scrollbar-hide min-w-0 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
